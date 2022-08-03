const { User } = require("../models");
const JWT = require("jsonwebtoken");
const config = require("../config/auth");
const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");

const usersController = {
  register: async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body.phoneNumber);
    const { firstName, lastName, email, birthday, password, terms } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const userExist = await User.findOne({
      where: {
        email,
      },
    });

    if (userExist) {
      return res.status(500).json({
        message: "Usuário já existe!",
      });
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      birthday,
      password: hash,
      terms,
    });

    return res.status(201).json({
      newUser,
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Usuário ou senha inválido!",
      });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        message: "Usuário ou senha inválido!",
      });
    }

    const token = JWT.sign(
      {
        userId: user.id,
      },
      config.secret,
      {
        expiresIn: config.expireIn,
      }
    );
    return res.status(200).json({
      user,
      auth: true,
      token,
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    await User.update(
      {
        firstName,
        lastName,
        email,
      },
      {
        where: {
          email: id,
        },
      }
    );

    if (!email) {
      const user = await User.findOne({
        where: { email: id },
      });
      console.log("teste", user);
      return res.status(200).json({
        user,
        message: "Usuário atualizado com sucesso",
      });
    } else {
      const user = await User.findOne({
        where: { email },
      });
      console.log("teste", user);
      return res.status(200).json({
        user,
        message: "Usuário atualizado com sucesso",
      });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    const deletedUser = await User.destroy({
      where: {
        email: id,
      },
    });

    return res.status(200).json({
      deletedUser,
      message: "Usuário deletado com sucesso",
    });
  },
};

module.exports = usersController;

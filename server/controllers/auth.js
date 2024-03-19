const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

async function register(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password)
      return res.status(400).send({ msg: "La contraseña es obligatoria" });

    const user = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      role: "user",
      active: false,
      deuda: 0,
      porPagar: 0,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    const userStorage = await user.save();
    res.status(200).send(userStorage);
    console.log(userStorage);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password)
      return res.status(400).send({ msg: "La contraseña es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    const userStore = await User.findOne({ email: emailLowerCase });
    console.log(userStore);

    if (!userStore) {
      return res.status(500).send({ msg: "Error del servidor 1" });
    } else {
      bcrypt.compare(password, userStore.password, (bcryptError, chek) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor 2" });
        } else if (!chek) {
          res.status(400).send({ msg: "Error del servidor 3" });
        } else if (!userStore.active) {
          res.status(401).send({ msg: "Usuario no activo" });
        } else {
          res.status(200).send({
            access: jwt.createAccesToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
      console.log(password);
      console.log(userStore);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function refreshAccesToken(req, res) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).send({ msg: "Token requerido" });
    }
    const { user_id } = jwt.decoded(token);
    const userStorage = await User.findOne({ _id: user_id });
    if (!userStorage) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accesToken: jwt.createAccesToken(userStorage),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

module.exports = {
  register,
  login,
  refreshAccesToken,
};

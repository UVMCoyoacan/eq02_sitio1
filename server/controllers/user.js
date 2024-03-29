const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function getMe(req, res) {
  const { user_id } = req.user;
  const response = await User.findById(user_id);
  if (!response) {
    return res.status(400).send({ msg: "No se ha encontrado el usuario" });
  } else {
    return res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;
  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }
  res.status(200).send(response);
}
async function setDeuda(req, res) {
  const { deuda } = req.body;
  const { email } = req.body;
  const { user_id } = req.user;
  const admin = await User.findById(user_id);
  let response = await User.find({ email: email });
  if (!response) {
    return res.status(400).send({ msg: "No se ha encontrado el usuario" });
  } else if (admin.role === "admin") {
    response = await User.findOneAndUpdate(
      { email: email },
      { deuda: deuda },
      { new: true }
    );
    response = await User.findOneAndUpdate(
      { email: email },
      { porPagar: deuda },
      { new: true }
    );

    return res.status(200).send(response);
  }
  return res.status(400).send({ msg: "El rol del usuario no es el correcto" });
}

async function createUser(req, res) {
  try {
    const { password } = req.body;

    // Generar un salt y luego hashear la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    // Crear un nuevo usuario con la contraseña hasheada
    const user = new User({
      ...req.body,
      active: false,
      password: hashPassword,
    });

    // Verificar si hay un avatar en la solicitud
    if (req.files.avatar) {
      console.log("Procesar");
      // Procesar el avatar aquí
    }

    // Guardar el usuario en la base de datos
    const userStored = await user.save();

    // Enviar una respuesta exitosa
    res.status(200).send({ msg: "Usuario creado correctamente" });
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    console.error(error);
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
}

async function addPago(req, res) {
  const { abono } = req.body;
  const { email } = req.body;
  const { user_id } = req.user;
  const admin = await User.findById(user_id);
  let response = await User.find({ email: email });
  if (!response) {
    return res.status(400).send({ msg: "No se ha encontrado el usuario" });
  } else {
    if (response[0].porPagar >= abono) {
      if (admin.role === "admin") {
        var nuevoPagos = response[0].pagos;
        const miNuevoPago = { monto: abono, fecha: Date.now() };
        nuevoPagos.reverse();
        nuevoPagos.push(miNuevoPago);
        nuevoPagos.reverse();
        response = await User.findOneAndUpdate(
          { email: email },
          { pagos: nuevoPagos },
          { new: true }
        );
        response = await User.findOneAndUpdate(
          { email: email },
          { porPagar: response.porPagar - abono },
          { new: true }
        );
        if (response.porPagar === 0) {
          const nuevoAdeudo = { fecha: Date.now(), total: response.deuda };
          response = await User.findOneAndUpdate(
            { email: email },
            { deuda: 0 },
            { new: true }
          );
          let adeudosAct = response.deudasSaldadas;
          adeudosAct.reverse();
          adeudosAct.push(nuevoAdeudo);
          adeudosAct.reverse();

          response = await User.findOneAndUpdate(
            { email: email },
            { deudasSaldadas: adeudosAct },
            { new: true }
          );
        }
        response = await User.findOne({ email: email }).sort({ pagos: "desc" });
        return res.status(200).send(response);
      }
      return res.status(400).send({
        msg: "El usuario tiene rol incorrecto",
      });
    } else {
      return res.status(400).send({
        msg: "El abono es mayor al monto por pagar",
      });
    }
  }
}
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;
    if (userData.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);
      userData.password = hashPassword;
    } else {
      delete userData.password;
    }

    // Usar await para esperar a que la actualización se complete
    await User.findByIdAndUpdate({ _id: id }, userData);

    // Enviar una respuesta exitosa
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    console.error(error);
    res.status(400).send({ msg: "Error al actualizar al usuario" });
  }
}
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Eliminacion correcta" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al eliminar al usuario" });
  }
}
async function getUser(req, res) {
  const { email, active } = req.body;
  let response = null;
  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.findOne({ email });
  }
  if (response === null) {
    res.status(400).send({ msg: "Usuario no encontrado" });
  } else {
    res.status(200).send(response);
  }
}
async function updtatePassword(req, res) {
  const { user_id } = req.user;
  console.log(req.user);
  const usuario = await User.findById(user_id);
  const { password, newPassword } = req.body;
  const salt = bcrypt.genSaltSync(10);
  bcrypt.compare(password, usuario.password, async function (err, result) {
    if (err) {
      console.error("Error al comparar contraseñas:", err);
      res.status(400).send({ msg: "error al comparar contraseñas" });
    } else {
      if (result) {
        const hashPassword = bcrypt.hashSync(newPassword, salt);
        await User.findByIdAndUpdate(user_id, { password: hashPassword });
        res.status(200).send({ msg: "Contraseña actualizada correctamente" });
      } else {
        res.status(400).send({ msg: "La contraseña es incorrecta" });
      }
    }
  });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  setDeuda,
  addPago,
  updateUser,
  deleteUser,
  getUser,
  updtatePassword,
};

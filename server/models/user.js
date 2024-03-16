const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  active: Boolean,
  pagos: [
    {
      fecha: Date,
      monto: Number,
    },
  ],
  deuda: Number,
  porPagar: Number,
});
module.exports = mongoose.model("User", UserSchema);

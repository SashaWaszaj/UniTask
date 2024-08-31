const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, "El nombre es requerido"]
    },
    lastName: {
      type: String,
      required: [true, "El apellido es requerido"]
    },
    email: {
      type: String,
      required: [true, "El correo es requerido"]
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
    }
  });

  UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

  UserSchema.pre("Validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("ConfirmPasword", "La contraseña no es igual a confirmar contraseña");
    }
    next();
  });

  UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
    });
  })

const User = mongoose.model("User", UserSchema);

module.exports = User;
const User = require('../model/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {secret} = require("../config/jwt");

module.exports.addUser = async (req, res) => {
    const {firstName, lastName, email} = req.body;
    if(!firstName|| !lastName|| !email) {
        return res.status(400).json({message: "Faltan datos"});
    }
    if(!firstName) {
        return res.status(400).json({message: "Falta el nombre"})
    }
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch(error) {
        res.json({message: "Error al crear el usuario", error: error.message});
    }
};


module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "El correo y la contraseña son requeridos" });
    }
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }
      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }
  
      const payload = {
        id: user._id,
      };
  
      let token = jwt.sign(payload, secret, {
        expiresIn: "24h",
      });
  
      res.json({ user, token });
    } catch (error) {
      return res.status(500).json({ error: "Error en el servidor", error });
    }
  };
  
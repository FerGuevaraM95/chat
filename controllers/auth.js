const bcrypt = require('bcryptjs');

const User = require('../models/user');

const createUser = async (req, res) => {
  

  try {

    const {email, password} = req.body;

    const existEmail = await User.findOne({email});

    if(existEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe'
      });
    };

    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    // Guardar usuario en DB
    await user.save();

    res.json({
      user
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
    
  };

};

const login = async (req, res) => {

  const {email, password} = req.body;

  res.json({
    ok: true,
    msg: 'login',
    email, 
    password
  });
}

const renewToken = async (req, res) => {

  res.json({
    ok: true,
    msg: 'renew'
  });
}

module.exports = {
  createUser,
  login,
  renewToken
};
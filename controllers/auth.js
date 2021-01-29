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

    // Guardar usuario en DB
    const user = new User(req.body);
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
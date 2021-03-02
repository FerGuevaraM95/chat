const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

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

    // Generar JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token
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


  try {

    const userDB = await User.findOne({email});
    if(!userDB) {
      res.status(404).json({
        ok: false,
        msg: 'No existe una cuenta registrada con este email'
      });
    };

    // Validar password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if(!validPassword) {
      res.status(404).json({
        ok: false,
        msg: 'Contraseña inorrecta'
      });
    };

    // Generar Token
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      user: userDB,
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  };
}

// Renovar Token
const renewToken = async (req, res) => {

  const uid = req.uid;

  // Generar nuevo Token
  const token = await generateJWT(uid);

  // Obtener el usuario por UID
  const user = await User.findById(uid);


  res.json({
    ok: true,
    user,
    token
  });
}

module.exports = {
  createUser,
  login,
  renewToken
};
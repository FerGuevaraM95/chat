const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

  try {

    const token = req.header('x-token');

    // console.log({token});

    if(!token) {
      return res.status(401).json({
        ok: false,
        msg: 'Token no válido'
      });
    };

    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;

    next();
    
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  };
};

module.exports = {
  validateJWT
};
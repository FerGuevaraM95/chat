const mongoose = require("mongoose");

const dbConection = async () => {
  try {

    await mongoose.connect(process.env.DB_CNN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("DB is online");

  } catch (error) {
    console.log(error);
    throw new Error("Error en DB - ver logs");
  }
};

module.exports = {
  dbConection
}
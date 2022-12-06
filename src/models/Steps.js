const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('steps', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    number:{
      type: DataTypes.INTEGER,
      validate:{
        isNulll(value){
          if(value === null){
            throw new Error("value == null");
          }
        }
      }
    },
    step:{
        type: DataTypes.TEXT,
        validate:{
          isNulll(value){
            if(value === null){
              throw new Error("value == null");
            }
          }
        }
    },
  });
};
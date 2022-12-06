const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', 
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        isNulll(value){
          if(value === null){
            throw new Error("name == null");
          }
        }
      }
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNulll(value){
          if(value === null){
            throw new Error("healthScore = null");
          }else if(value> 100){
            throw new Error("healthScore>100");
          }
        }
      }
    },
    img:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isNulll(value){
          if(value === null){
            throw new Error("img == null");
          }
        }
      }
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        isNulll(value){
          if(value === null){
            throw new Error("summary == null");
          }
        }
      }
    },
    instructions:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        isNulll(value){
          if(value === null){
            throw new Error("instructions == null");
          }
        }
      }
    },
    readInMinutes:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNulll(value){
          if(value === null){
            throw new Error("readInMinutes == null");
          }
        }
      }
    }
  },
  );
};

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('ingredientes', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
          isNulll(value){
            if(value === null){
              throw new Error("value == null");
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
              throw new Error("value == null");
            }
          }
        }
    },
    metric:{
        type: DataTypes.INTEGER,
        allowNull: false,
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
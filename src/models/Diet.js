const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('diet', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
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
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
        validate:{
          isNulll(value){
            if(value === null){
              throw new Error("value == null");
            }
          }
        }
    }
  });
};





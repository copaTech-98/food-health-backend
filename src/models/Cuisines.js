const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('cuisines', {
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
    }
  });
};

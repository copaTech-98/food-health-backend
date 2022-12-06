require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];


(async () => {
  await fs.readdirSync(path.join(__dirname, '../models'))
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '../models', file)));
    });
})()

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Cuisines, Recipe, Steps, Ingredientes, Diet } = sequelize.models;

      Cuisines.hasMany(Recipe, { foreignKey: "id_cuisine" });
      Recipe.belongsTo(Cuisines, { foreignKey: "id_cuisine" });

      Recipe.hasMany(Steps, { foreignKey: "id_recipe" });
      Steps.belongsTo(Recipe, { foreignKey: "id_recipe" });

      Steps.belongsToMany(Ingredientes, { through: "ingredientesSteps" });
      Ingredientes.belongsToMany(Steps, { through: "ingredientesSteps" });

      Recipe.belongsToMany(Ingredientes, { through: "ingredientesReceta" });
      Ingredientes.belongsToMany(Recipe, { through: "ingredientesReceta" });

      Recipe.belongsToMany(Diet, { through: "recetaDieta" });
      Diet.belongsToMany(Recipe, { through: "recetaDieta" });


module.exports = {
  ...sequelize.models,
  conn: sequelize,
}

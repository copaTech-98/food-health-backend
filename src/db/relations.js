const { conn, Cuisines, Recipe, Steps, Ingredientes, Diet } = require('./index.js');
console.log(conn)
module.exports = () => {
    
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
}


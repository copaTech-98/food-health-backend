const {  ingredientesReceta, ingredientesSteps, recetaDieta, Recipe, Cuisines, Diet, Ingredientes, Steps } = require('../db');
// const saveRecipe = require('./functions/saveRecipe');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const controllers = [];

(async ()=> {
    await fs.readdirSync(path.join(__dirname,'/functions'))
       .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
       .forEach((file) => {
        controllers.push(require(path.join(__dirname, '/functions', file)));
       });
  })()
  const [addDiet,addIngrediente,addIngredienteToStep,deleteCuisine,deleteDiet,deleteIngrediente,deleteRecipe,getCuisines,getDiets,getIngredientes,getRecipe,getRecipeInfo,saveCuisine,saveDiet,saveIngrediente,saveRecipe,saveStep,setDiets,setIngredienteToStep,setRecetaToIngrediente,updateRecipe] = controllers;

module.exports =
{
    saveRecipe,
    saveDiet,
    saveCuisine,
    saveStep,
    saveIngrediente,
    getRecipe,
    getRecipeInfo,
    getIngredientes,
    getCuisines,
    getDiets,
    deleteRecipe,
    deleteIngrediente,
    deleteCuisine,
    deleteDiet,
    addDiet,
    addIngrediente,
    addIngredienteToStep,
    setIngredienteToStep,
    setRecetaToIngrediente,
    setDiets,
    updateRecipe
}
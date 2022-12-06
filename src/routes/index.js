const { Router } = require('express');
const controller = require('../controllers/index');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
/**                    SAVE                            **/
router.post('/recipe',controller.saveRecipe);
router.post('/diets' , controller.saveDiet);
router.post('/cuisine', controller.saveCuisine);
router.post('/step', controller.saveStep);
router.post('/ingrediente', controller.saveIngrediente);
/**                     EDIT                              **/
router.put('/addDiets', controller.addDiet);
router.put('/recipe', controller.updateRecipe);
router.put('/recetaIngrediente', controller.addIngrediente);
router.put('/ingredienteToStep', controller.addIngredienteToStep);
router.put('/editDiets', controller.setDiets);
router.put('/editRecetaIngrediente', controller.setRecetaToIngrediente);
router.put('/editIngredienteToStep', controller.setIngredienteToStep);
/**                     DELETE                            **/
router.delete('/recipe/:id', controller.deleteRecipe);
router.delete('/ingrediente/:id', controller.deleteIngrediente);
router.delete('/cuisine/:id', controller.deleteCuisine);
router.delete('/diet/:id', controller.deleteDiet);
/**                     GET                             **/
router.get('/recipes', controller.getRecipe);
router.get('/recipe/:id', controller.getRecipeInfo);
router.get('/ingredients', controller.getIngredientes);
router.get('/cuisines', controller.getCuisines);
router.get('/diets', controller.getDiets);

module.exports = router;

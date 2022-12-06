const {  ingredientesReceta, ingredientesSteps, recetaDieta, Recipe,  Steps } = require('../../db');
module.exports = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (id !== undefined && id !== '') {
        const deleteAll = new Promise(async (resolve, reject) => {
            try {
                const del_ingredientes = await ingredientesReceta.destroy({
                    where: {
                        recipeId: id
                    }
                });
                resolve(del_ingredientes);
            } catch (e) {
                reject(e);
            }
        });
        deleteAll.then(async () => {
            try {
                const delete_diets = await recetaDieta.destroy({
                    where: {
                        recipeId: id
                    }
                });
                return delete_diets;
            } catch (e) {
                return e;
            }
        }, err => {
            return res.status(500).json({ status: "error", data: `Internal Error: ${err}` });
        }).then(async () => {
            try {
                const IdSteps = await Steps.findAll({
                    where: {
                        id_recipe: id
                    },
                    attributes: ["id"]
                });
                const arrIdSteps = IdSteps.map(step => step.id);
                return arrIdSteps;
            } catch (e) {
                return res.status(500).json({ status: "error", data: `Internal error: ${e}` });
            }
        }, err => {
            return res.status(500).json({ status: "error", data: `Internal error: ${err}` });
        }).then(async response => {
           await response.forEach(async element => {
                try {
                    await ingredientesSteps.destroy({
                        where: { ingredienteId: element }
                    })
                    response.shift();
                } catch (e) {
                    return res.status(500).json({status:"error", data: 'Internal error: ${e}'});
                }
            })
            return response;
        }, err => res.status(500).json({status:"error", data: `Internal error: ${err}`}))
        .then(async () => {
            try{
                const deleteStep = await Steps.destroy({
                    where: {id_recipe: id}
                })
                return deleteStep
            }catch(e){
                return res.status(500).json({stauts: "error", data: `Internal error: ${e}`})
            }
        },err=> res.status(500).json({stauts: "error", data:`Internal error: ${err}`}))
        .then(async () => {
            try{
                const deleteRecipe = await Recipe.destroy({
                    where: {id}
                })
                return res.status(200).json({status:"done", data: `Receta ${id} elimidada correctamente!`});
            }catch(e){
                return res.status(500).json({status:"error", data: `Internal error ${e}`});
            }
        })
    }
}
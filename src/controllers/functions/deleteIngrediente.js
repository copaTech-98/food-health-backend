const {ingredientesReceta, ingredientesSteps, Ingredientes} = require('../../db');
module.exports = async (req,res) => {
    const {id} = req.params;
    if(id !== undefined && id !== ''){
        const deleteAll = new Promise(async (resolve,reject) => {
            try{
                const delete_ingrediente = await Ingredientes.destroy({
                    where: {id}
                })
                if(delete_ingrediente>0) resolve(delete_ingrediente)
                else reject(new Error(`No se encontro el ingrediente con id: ${id}`));
            }catch(e){
                reject(e);
            }
        })
        deleteAll.then(async ()=>{
            try{
                return await ingredientesReceta.destroy({
                    where: {ingredienteId: id}
                })
            }catch(e){
                return res.status(500).json({status: "error", data: `Internal error: ${e}`})
            }
        },err => res.status(500).json({status: "error", data: `Internal error: ${err}`}))
        .then(async ()=> {
            try{
                 await ingredientesSteps.destroy({
                    where: {ingredienteId: id}
                });
                return res.status(200).json({status: "done", data: `Ingrediente con id: ${id} se ha eliminado correctamente!`});
            }catch(e){
                return res.status(500).json({status: "error", data: `Internal error: ${e}`})
            }
        }, err => res.status(500).json({status: "error", data: `Internal error: ${err}`}))
    }
}
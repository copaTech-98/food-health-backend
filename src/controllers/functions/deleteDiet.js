const {Diet, recetaDieta} = require('../../db');
module.exports = async (req,res)=> {
    const {id} = req.params;
    try{
        await recetaDieta.destroy({
            where: {dietId:id}
        });
        await Diet.destroy({
            where: {id}
        }) > 0 ? res.status(200).json({ status: "done", data: `Dieta con id: ${id} eliminado correctamente` }) : res.status(500).json({ status: "error", data:`Error, no se encontraron datos con el id: ${id}`})
    }catch(e){
        return res.status(500).json({ status: "error", data:`Internal error: ${e}`});
    }
}
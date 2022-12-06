const {Cuisines ,Recipe} = require('../../db');
module.exports = async (req,res)=> {
    const {id} = req.params;
    if(id!== undefined && id!== ''){
        try{
           await Recipe.update(
                {id_cuisine: null},
                {where: {id_cuisine: id}}
            )
            const deleteCuisine = await Cuisines.destroy({
                where: {id}
            })
            deleteCuisine > 0 ? res.status(200).json({ status: "done", data:`Cuisine con id: ${id} aliminado correctamente!`}) : res.status(500).json({ status: "error", data: `No se encontro cuisine con id: ${id}`});
        }catch(e){
            return res.status(500).json({ status: "error", data:`Internal error: ${e}`});
        }
    }
}
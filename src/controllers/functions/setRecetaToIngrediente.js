const {Recipe} = require('../../db');
module.exports =  async (req, res) => {
    const { id, ingredientes } = req.body;
    if (id !== '' && ingredientes !== undefined && ingredientes.length !== 0) {
        const receta = new Promise(async (resolve, reject) => {
            try {
                const data = await Recipe.findByPk(id);
                if (data.length !== 0) {
                    resolve(data);
                } else {
                    reject(new Error("Error no se encontraron datos"));
                }
            } catch (e) {
                reject(e);
            }
        });
        receta.then(async data => {
            try {
                await data.setIngredientes(ingredientes);
                return res.status(200).json({ status: "done", data: `Ingredientes agregados a la receta ${data.name}` });
            } catch (e) {
                res.status(500).json({ status: "error", data: `Internal error: ${e}` });
            }
        })
    }
}
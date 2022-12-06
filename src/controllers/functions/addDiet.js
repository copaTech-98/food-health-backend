const {Recipe} = require('../../db');
module.exports = async (req, res) => {
    const { id, diets } = req.body;
    const Receta = new Promise(async (resolve, reject) => {
        try {
            const receta = await Recipe.findByPk(id);
            if (receta.length !== 0) {
                resolve(receta);
            } else {
                reject(new Error(`No se encontro la receta con el id ${id}`));
            }
        } catch (e) {
            reject(new Error(`Internal error: ${e}`));
        }
    });
    Receta.then(async response => {
        try {
            await response.addDiets(diets);
            res.status(200).json({ status: "done", data: `Diets successfully added` });
        } catch (e) {
            res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    }, response => {
        return res.status(500).json({ status: "error", data: `Internal error: ${response}` });
    })
}
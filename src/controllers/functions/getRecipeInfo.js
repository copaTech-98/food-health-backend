const {Recipe, Steps} = require('../../db');
module.exports = async (req, res) => {
    const { id } = req.params;
    const Receta = new Promise(async (resolve, reject) => {
        try {
            const data = await Recipe.findAll(
                {
                    where: {
                        id
                    },
                    include: [
                        {
                            model: Diet,
                            attributes: ['name']
                        },
                        {
                            model: Cuisines,
                            attributes: ['name']
                        },
                        {
                            model: Ingredientes,
                            attributes: ['name', 'img']
                        }
                    ]
                }
            );
            if (data.lenth !== 0) {
                resolve(data);
            } else {
                reject(`Error no se encontro la receta con el id[${id}]`);
            }
        } catch (e) {
            reject(e);
        }
    });
    Receta.then(async response => {
        try {
            const pasos = await Steps.findAll({
                where: {
                    id_recipe: id
                },
                include: { model: Ingredientes }
            });
            return res.status(200).json({ status: "done", data: { ...response, steps: pasos } });
        } catch (e) {
            res.status(500).json({ status: "error", data: "Internal error: " + e });
        }
    })
}
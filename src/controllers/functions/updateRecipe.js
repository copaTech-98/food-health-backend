const {Recipe} = require('../../db');
module.exports = async (req, res) => {
    const { id, name, healthScore, img, summary, instructions, readInMinutes, id_cuisine } = req.body;
    if (id !== '' && id !== undefined && name !== undefined && healthScore !== undefined && img !== undefined && summary !== undefined && instructions !== undefined && readInMinutes !== undefined && id_cuisine !== undefined) {
        try {
            const updateRecipe = await Recipe.update(
                { name, healthScore, img, summary, instructions, readInMinutes, id_cuisine },
                {
                    where: { id }
                }
            );
            updateRecipe[0] > 0 ? res.status(200).json({ status: "done", data: `La receta ${id} se actualizo con exito` }) : res.status(404).json({ status: "error", data: `No se encontro la receta ${id}` })
        } catch (e) {
            res.status(500).json({ status: "error", data: `Error updating recipe ${e}` });
        }
    } else {
        return res.status(400).json({ status: "error", data: "Error faltan datos!!" });
    }
}
const {Recipe} = require('../../db');
module.exports = async (req, res) => {
    const { name, healthScore, img, summary, instructions, readInMinutes, id_cuisine } = req.body;
    if (name !== undefined && healthScore !== undefined && img !== undefined && summary !== undefined && instructions !== undefined && readInMinutes !== undefined && id_cuisine !== undefined) {
        try {
            const newRecipe = await Recipe.create({ name, healthScore, img, summary, instructions, readInMinutes, id_cuisine });
            res.status(200).json({ status: "done", data: newRecipe });
        } catch (e) {
            res.status(500).json({ status: "error", data: `Error creating recipe ${e}` });
        }
    } else {
        return res.status(400).send("Error faltan datos!!");
    }
}
const {Recipe} = require('../../db');
module.exports = async (req, res) => {
    const { name } = req.query;
    console.log(name);
    if (name !== undefined && name !== '') {
        try {
            const data = await Recipe.findAll({
                where: { name },
                attributes: ['id', 'name', 'img'],
            });
            data.length > 1 ? res.status(200).json({ status: "done", data: data }) : res.status(404).json({ status: "error", data: `No se econtro la receta! ${name}` });
        } catch (e) {
            return res.status(400).json({ status: "error", data: `Error ${e}` });
        }
    } else {
        try {
            const data = await Recipe.findAll({
                attributes: ['id', 'name', 'img'],
            });
            data.length > 0 ? res.status(200).json({ status: "done", data: data }) : res.status(404).json({ status: "error", data: "No hay datos!" });
        } catch (e) {
            res.status(400).json({ status: "error", data: `Error: ${e}` });
        }
    }
}
const {Diet} = require('../../db');
module.exports =  async (req, res) => {
    const { id, name } = req.query;
    if (id !== '' && id !== undefined) {
        try {
            const diets = await Diet.findByPk(id);
            diets.id == id ? res.status(200).json({ status: "done", data: diets }) : res.status(404).json({ status: "error", data: `No se encontro dieta con el id: ${id}` });
        } catch (e) {
            return res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    } else if (name != '' && name !== undefined) {
        try {
            const diets = await Diet.findAll({
                where: { name }
            });
            diets.length !== 0 ? res.status(200).json({ status: "done", data: diets }) : res.status(404).json({ status: "error", data: `No se encontro dieta con el name:${name}` });
        } catch (e) {
            return res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    }
    if (name === undefined && id === undefined) {
        try {
            const diets = await Diet.findAll();
            diets.length !== 0 ? res.status(200).json({status: "done",data:diets}) : res.status(404).json({ status: "error", data: `No se encontraron dietas` });
        } catch (e) {
            return res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    }
}
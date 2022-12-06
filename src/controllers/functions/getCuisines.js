const {Cuisines} = require('../../db');
module.exports =  async (req, res) => {
    const { id, name } = req.query;
    if (id !== '' && id !== undefined) {
        try {
            const cuisines = await Cuisines.findByPk(id);
            cuisines.id == id ? res.status(200).json({ status: "done", data: cuisines }) : res.status(404).json({ status: "error", data: `No se encontro cocina con el id: ${id}` });
        } catch (e) {
            return res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        } s
    } else if (name != '' && name !== undefined) {
        try {
            const cuisines = await Cuisines.findAll({
                where: { name }
            });
            cuisines.length !== 0 ? res.status(200).json({ status: "done", data: cuisines }) : res.status(404).json({ status: "error", data: `No se encontro cocina con el name:${name}` });
        } catch (e) {
            return res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    }
    if (name === undefined && id === undefined) {
        try {
            const cuisines = await Cuisines.findAll();
            cuisines.length !== 0 ? res.status(200).json({ status: "done", data: cuisines }) : res.status(404).json({ status: "error", data: `No se encontraron cocinas` });
        } catch (e) {
            return res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    }
}
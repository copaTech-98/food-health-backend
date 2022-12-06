const {Ingredientes} = require('../../db');
module.exports = async (req, res) => {
    const { id, name } = req.query;
    if (id !== '' && id !== undefined) {
        try {
            const ingredientes = await Ingredientes.findByPk(id);
            ingredientes.id == id ? res.status(200).json(ingredientes) : res.status(404).json({ status: "error", data: `No se encontro el ingrediente con el id: ${id}` });
        } catch (e) {
            return res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    } else if (name != '' && name !== undefined) {
        try {
            const ingredientes = await Ingredientes.findAll({
                where: { name },
                attributes: ["id"]
            });
            ingredientes.length !== 0 ? res.status(200).json({ status: "done", data: ingredientes }) : res.status(404).json({ status: "error", data: `No se encontro el ingrediente con el name:${name}` });
        } catch (e) {
            return res.status(500).send({ status: "error", data: `Internal error: ${e}` });
        }
    }
    if (name === undefined && id === undefined) {
        try {
            const ingredientes = await Ingredientes.findAll({ attributes: ["id"] });
            // const arrIds = ingredientes.map(ingrediente => ingrediente.id);
            // console.log(arrIds);
            ingredientes.length !== 0 ? res.status(200).json({ status: "done", data: ingredientes }) : res.status(404).json({ status: "error", data: `No se encontraron ingredeintes` });
        } catch (e) {
            return res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    }
}
const {Ingredientes} = require('../../db');
module.exports = async (req, res) => {
    const { name, img, metric } = req.body;
    if (name !== '' && img !== '' && metric !== '') {
        try {
            const newIngrediente = await Ingredientes.create({ name, img, metric });
            res.status(200).json({ status: "done", data: newIngrediente });
        } catch (e) {
            res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    } else {
        return res.status(400).json({ status: "error", data: 'Error faltan datos' });
    }
}
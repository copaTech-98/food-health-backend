const {Steps} = require('../../db');
module.exports = async (req, res) => {
    const { number, step, id_recipe } = req.body;
    if (number !== '' && step !== '' && id_recipe !== '') {
        try {
            const newStep = await Steps.create({ number, step, id_recipe });
            res.status(200).json({ status: "done", data: newStep });
        } catch (e) {
            res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    } else {
        return res.status(400).json({ status: "error", data: `Error faltan datos.` })
    }
}
const {Diet} = require('../../db');
module.exports =async (req, res) => {
    const { name, description } = req.body;
    if (name !== undefined && description !== undefined && name != '' && description != '') {
        try {
            const newDiet = await Diet.create({ name, description });
            res.status(200).json({ status: "done", data: newDiet });
        } catch (e) {
            res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    } else {
        return res.status(400).json({ status: "error", data: "Error faltan datos!" });
    }
}
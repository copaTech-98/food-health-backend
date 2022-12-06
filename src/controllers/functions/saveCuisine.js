const {Cuisines} = require('../../db'); 
module.exports = async (req, res) => {
    const { name } = req.body;
    if (name !== undefined && name !== null) {
        try {
            const newCuisine = await Cuisines.create({ name: name });
            res.status(200).json({ status: "done", data: newCuisine });
        } catch (e) {
            res.status(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    }
}
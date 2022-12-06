const {Steps} = require('../../db');
module.exports= async (req, res) => {
    const { id, ingredientes } = req.body;
    const step = new Promise(async (resolve, reject) => {
        try {
            const data = await Steps.findByPk(id);
            if (data.length !== 0) {
                resolve(data);
            } else {
                reject(new Error("No se encontraron datos!"));
            }
        } catch (e) {
            reject(new Error(`Internal error: ${e}`));
        }
    });
    step.then(async data => {
        try {
            data.addIngredientes(ingredientes);
            res.status(200).json({ status: "done", data: "Ingredientes successfully added!" });
        } catch (e) {
            res.stauts(500).json({ status: "error", data: `Internal error: ${e}` });
        }
    }, reason => {
        return res.status(500).json({ status: "error", data: `Internal error: ${reason}` });
    })
}
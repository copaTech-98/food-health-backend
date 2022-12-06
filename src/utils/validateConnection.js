const { conn, Cuisines, Diet } = require('../db/index');
const { baseDiets, baseCuisines } = require('./defaults');

module.exports =  {
    validateConnection: async (port)=>{
    try {
          await conn.sync({ alter: true });
          const diets = await Diet.findAll();
          const cuisines = await Cuisines.findAll();
          if (diets.length < 11 && cuisines.length < 26) {
            if (baseDiets.length > 0 && baseCuisines.length > 0) {
              await baseDiets.forEach(async diet => {
                try {
                  await Diet.create({ name: diet.name, description: diet.description });
                } catch (e) {
                  throw new Error("Internal error" + e);
                }
              });
              await baseCuisines.forEach(async cuisine => {
                try {
                  await Cuisines.create({ name: cuisine.name });
                } catch (e) {
                  throw new Error("Internal error" + e);
                }
              })
            }
          }
          console.log("Listening on port:"+port);
      } catch (e) {
        console.log("Error synycing connection");
      }
  }
}

'use strict';


const product = require("../models/product");
const {
    sequelize,
    Region,
    Province
} = require('../models')





module.exports = {
  up: async (queryInterface, Sequelize) => {
Region.drop();
Province.drop(); 
   
    
     

    await Province.sync({ force: true });
      
    
    let urlPlaceHolderProvinceImageUrl ="https://i.postimg.cc/2Sgr0M4M/field-of-flowers-2269528-1920.jpg"; 
    let northHollandImageUrl = "https://i.postimg.cc/fb15PjL8/pexels-liene-ratniece-1329510.jpg"
    let southHollandImageUrl = "https://i.postimg.cc/Wp8YNZf1/pexels-chait-goli-2031706.jpg"
    let frieslandImageUrl = "https://i.postimg.cc/G34zCfYq/wind-mill-3344661-1920.jpg"
    let date = new Date(); 
    await queryInterface.bulkInsert('Provinces', [
      {name: 'Flevoland', id: 12, createdAt: date, updatedAt: date, imageUrl: urlPlaceHolderProvinceImageUrl },
      {name: 'Noord-Holland', id: 1, createdAt: date, updatedAt: date, imageUrl: northHollandImageUrl},
      {name: 'Utrecht', id: 11, createdAt: date, updatedAt: date, imageUrl: urlPlaceHolderProvinceImageUrl},
      {name: 'Zeeland',  id: 10, createdAt: date, updatedAt: date, imageUrl: urlPlaceHolderProvinceImageUrl },
      {name: 'Zuid-Holland',  id: 2, createdAt: date, updatedAt: date, imageUrl: southHollandImageUrl },
      {name: 'Friesland',  id: 3, createdAt: date, updatedAt: date, imageUrl: frieslandImageUrl },
    {name: 'Groningen',  id: 4, createdAt: date, updatedAt: date, imageUrl: urlPlaceHolderProvinceImageUrl },
    {name: 'Drenthe',  id: 5, createdAt: date, updatedAt: date, imageUrl: urlPlaceHolderProvinceImageUrl },
    {name: 'Noord-Brabant',  id: 6, createdAt: date, updatedAt: date, imageUrl: urlPlaceHolderProvinceImageUrl },
    {name: 'Gelderland',  id: 7, createdAt: date, updatedAt: date, imageUrl: urlPlaceHolderProvinceImageUrl },
    {name: 'Limburg',  id: 8, createdAt: date, updatedAt: date, imageUrl: urlPlaceHolderProvinceImageUrl },
    {name: 'Overijssel',  id: 9, createdAt: date, updatedAt: date, imageUrl: urlPlaceHolderProvinceImageUrl },

    
    
    ], {});

 /*
1. Noord-Holland
2. Zuid-Holland
3. Friesland
4. Groningen
5. Drenthe
6. Noord-Brabant
7. Gelderland
8. Limburg
9. Overijssel
10. Zeeland
11. Utrecht
12. Flevoland
*/
   
   await Region.sync({ force: true });
    await queryInterface.bulkInsert('Regions', [
      {name: 'Amsterdam',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Volendam',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Marken',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Edam',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Monnickendam',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Hoorn',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Enkhuizen',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Haarlem',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Zandvoort',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Alkmaar',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Texel',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Ijmuiden',  ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Egmond aan Zee',  ProvinceId: 1, createdAt: date, updatedAt: date},


      {name: 'Rotterdam',  ProvinceId: 2, createdAt: date, updatedAt: date},
      {name: 'Den Haag',  ProvinceId: 2, createdAt: date, updatedAt: date},
      {name: 'Scheveningen',  ProvinceId: 2, createdAt: date, updatedAt: date},
      {name: 'Delft',  ProvinceId: 2, createdAt: date, updatedAt: date},
      {name: 'Gouda',  ProvinceId: 2, createdAt: date, updatedAt: date},
      {name: 'Leiden',  ProvinceId: 2, createdAt: date, updatedAt: date},

      {name: 'Leeuwarden',  ProvinceId: 3, createdAt: date, updatedAt: date},
      {name: 'Sneek',  ProvinceId: 3, createdAt: date, updatedAt: date},
      {name: 'Hindeloopen',  ProvinceId: 3, createdAt: date, updatedAt: date},

      {name: 'Groningen', ProvinceId: 4, createdAt: date, updatedAt: date},
      {name: 'Drenthe', ProvinceId: 5, createdAt: date, updatedAt: date},

      {name: 'Eindhoven', ProvinceId: 6, createdAt: date, updatedAt: date},
      {name: 'Tilburg', ProvinceId: 6, createdAt: date, updatedAt: date},

      {name: 'Nijmegen', ProvinceId: 7, createdAt: date, updatedAt: date},
      {name: 'Arnhem', ProvinceId: 7, createdAt: date, updatedAt: date},

      {name: 'Maastricht', ProvinceId: 8, createdAt: date, updatedAt: date},
      {name: 'Valkenburg', ProvinceId: 8, createdAt: date, updatedAt: date},


      {name: 'Enschede', ProvinceId: 9, createdAt: date, updatedAt: date},
      {name: 'Giethoorn', ProvinceId: 9, createdAt: date, updatedAt: date},

      {name: 'Goes', ProvinceId: 10, createdAt: date, updatedAt: date},
      {name: 'Middelburg', ProvinceId: 10, createdAt: date, updatedAt: date},

      
      {name: 'Utrecht', ProvinceId: 11, createdAt: date, updatedAt: date},
      {name: 'Amersfoort', ProvinceId: 11, createdAt: date, updatedAt: date},

      {name: 'Friesland', ProvinceId: 12, createdAt: date, updatedAt: date},
      {name: 'Leeuwarden', ProvinceId: 12, createdAt: date, updatedAt: date},
      {name: 'Sneek', ProvinceId: 12, createdAt: date, updatedAt: date},
      {name: 'Hindeloopen', ProvinceId: 12, createdAt: date, updatedAt: date},
      {name: 'Bolsward', ProvinceId: 12, createdAt: date, updatedAt: date},



      {name: 'Lelystad', ProvinceId: 12, createdAt: date, updatedAt: date},
      {name: 'Haarlem', ProvinceId: 1, createdAt: date, updatedAt: date},
      {name: 'Utrecht', ProvinceId: 11, createdAt: date, updatedAt: date},
      {name: 'Goes',  ProvinceId: 10, createdAt: date, updatedAt: date },
    ], {});

    // const regions = await queryInterface.sequelize.query(
    //   `SELECT * FROM REGION;`
    // );
    //   console.log("All Regions: ", regions);
    

     const provinces = await queryInterface.sequelize.query(
      `SELECT * FROM Provinces;`
    );
      console.log("All Provicnes: ", provinces);
    },
  
  down: async (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('regions', null, {}), queryInterface.bulkDelete('provinces', null, {}); 
    
  }

};

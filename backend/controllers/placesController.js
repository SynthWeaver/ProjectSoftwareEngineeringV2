const {
    sequelize,
    Region,
    Province
} = require('../models');
const region = require('../models/region');



async function createProvince(req,res) {
    try {
        if(req==null){ 
            return;
        }
        await Province.sync({ force: false });
        const{region,name, imageUrl} = req.body
        const province = await Province.create({
           region,name, imageUrl     
        })
        return res.json(province)
    } catch (error) {
        console.log(error)
        return res.status, imageUrl
    }
}

async function createRegion(req,res) {
    try {
        if(req==null){ 
            return;
        }
        await Region.sync({ force: false });
        const{name,ProvinceId, } = req.body
        const region = await Region.create({
            name,ProvinceId,
           
        })
        return res.json(region)
    } catch (error) {
        console.log(error)
        return res.status
    }
}

async function findRegions(req, res){
    const ProvinceId = req.body.ProvinceId
    console.log(ProvinceId)
    const regions = await findByProvince(ProvinceId);
    console.log("test"+regions)
    res.send(regions)
};

//This method returns an object of all provinces with all their regions.
async function findAllProvincesWithRegions(req,res){
    //
    let provinces = await Province.findAll();
    let provinceArray = []
    let regions = []  

    for(record in provinces){
        ProvinceId =provinces[record].dataValues.id
        let provinceObj = {
            name: provinces[record].dataValues.name,
            imageUrl: provinces[record].dataValues.imageUrl,
            regions: 
            [], 
            
        }
    regions  = await findByProvince(ProvinceId)
    for(regionRecord in regions){
        provinceObj.regions.push(regions[regionRecord].name )
    }
    provinceArray.push(provinceObj)
    }
    res.send(provinceArray)
}

async function findByProvince(ProvinceId){
    
    const regions = await Region.findAll({
        where: {
            ProvinceId: ProvinceId
        }
    });
     
    return regions;
};






module.exports = {
    createProvince,createRegion,findRegions,findAllRegions: findAllProvincesWithRegions
};
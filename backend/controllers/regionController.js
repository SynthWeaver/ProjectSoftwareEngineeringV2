const {
    sequelize,
    Region
} = require('../models')



async function createRegion(req, res) {
    try {
        if (req == null) {
            return;
        }
        await Product.sync({
            force: false
        });
        const {
            name, 
            province
        } = req.body
        const product = await Product.create({
            name,
            province
        })
        return res.json(product)
    } catch (error) {
        console.log(error)
        return res.status
    }
}

async function findAll(){
    const regions = await Region.findAll();
    return regions;
};

async function findByName(id){
    
    
    const region = await Region.findOne({
        where: {
            id: id
        }
    });
     
    return region;
};

module.exports = {
    createRegion,
    findAll,
    findByName,
}
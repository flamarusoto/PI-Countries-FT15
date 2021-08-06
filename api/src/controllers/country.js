const { Country, Activity } = require ('../db');
const { Op } = require('sequelize');

// const data = async () => {
//     const response = await axios.get(`https://restcountries.eu/rest/v2/all`);
//     console.log('data api', response.data)
//     return response.data
// }

const getCountryById = async(req, res) => {
    try {
        const { id } = req.params;
        console.log(id, 'id')
        const country = await Country.findByPk(id.toUpperCase(), {
          include: { model: Activity },
          attributes: { exclude: ["createdAt", "updatedAt"] }
        })
          return res.json(country)
      } catch (error) {
        console.log({ message: "Country Not Found" })
      }
};
const getCountries = async(req, res) => {
    let { name } = req.query;
    let countries
      
    if(name){
        // name = name.split(" ").map((n) => n.charAt(0).toUpperCase() + n.split(1).join(" "));
        console.log(name, 'name')
        try{
            let countries = await Country.findAll({
                attributes: {
                    exclude: ["updatedAt", "createdAt"]
               },
                include: {model: Activity, require: true},
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
          res.send(countries)
        }
        catch(error){res.status(404).send('The country doesn´t exist')}
    }
    else{
        countries = await Country.findAll({
            attributes: {
                 exclude: ["updatedAt", "createdAt"]
            },
            include: {
                model: Activity,
                require: true
            }
        })
       res.send(countries)
    }
};

module.exports = {
    getCountries,
    getCountryById
}
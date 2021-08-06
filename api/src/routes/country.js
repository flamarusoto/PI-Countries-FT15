const { Router } = require('express');
const router = Router();
const axios = require ('axios').default;
const { Country } = require ('../db');

const { getCountries, getCountryById } = require('../controllers/country');

router.use(async (req, res, next) => {
    const countries = await Country.count();
    console.log("countries", countries)
    if (!countries) {
      const api = await axios.get(
        "https://restcountries.eu/rest/v2/all"
      );
      const countrymap = api.data.map((e) => ({
            id: e.alpha3Code,
            name: e.name,
            image_flag: e.flag,
            continent: e.region,
            capital: e.capital,
            subregion: e.subregion,
            area:e.area,
            population: e.population
      }));
      await Country.bulkCreate(countrymap); 
    }
    next();
    // try {
    //     let countries = await Country.findAll();
    //     console.log('countries', countries)
    //     if(countries.length === 0 ){
    //         countries = await axios.get(`https://restcountries.eu/rest/v2/all`);
    //         countries = await countries.data.map(async (e) =>{
    //             await Country.bulkCreate({
                    // id: e.alpha3Code,
                    // name: e.name,
                    // image_flag: e.flag,
                    // continent: e.region,
                    // capital: e.capital,
                    // subregion: e.subregion,
                    // area:e.area,
                    // population: e.population
    //             })
    //         })
    //     }  res.send(countries);
    // } catch (error){res.status(404).send('The country doesn´t exist')}
})
router.get('/countries/:id', getCountryById);
router.get('/countries', getCountries);


module.exports = router;
const { Activity, Country } = require('../db');

const createActivity = async(req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    console.log(name, difficulty, duration, season, countries)
    try{
        const activity = await Activity.create({
            name, difficulty, duration, season
        })
        let countryAdd;
        if(Array.isArray(countries)) {
            countryAdd = await Promise.all(
                countries.map((country) => Country.findByPk(country))
            )
        }
        if(countryAdd) {
            await activity.setCountries(countryAdd)
        }
        res.send( activity)
    }
    catch(error){
        console.log(error)
    }
};

const getActivity = async(req, res) => {
    try {
        const activities = await Activity.findAll();
        return res.json(activities);
      } catch (error) {
        res.status(400).send("Something went wrong");
      }
};

module.exports = {
    getActivity,
    createActivity
}
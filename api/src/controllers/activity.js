const { Activity, Country } = require('../db');

const createActivity = async(req, res) => {
    const { name, difficulty, duration, season, country } = req.body;
    console.log(name, difficulty, duration, season, country)
    try{
        const activity = await Activity.create({
            name, difficulty, duration, season
        })
        let countryAdd;
        if(Array.isArray(country)) {
            countryAdd = await Promise.all(
                country.map((countryID) => Country.findByPk(countryID))
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
        // if(activities < 1) { res.send({message: "No activities"})}
        return res.json(activities);
      } catch (error) {
        res.status(400).send("Something went wrong");
      }
};

module.exports = {
    getActivity,
    createActivity
}
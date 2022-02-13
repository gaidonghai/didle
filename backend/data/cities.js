class Cities {
    constructor(cities) {
        this.cities = cities;
        this.basics = cities.map(o => {
            return JSON.parse(JSON.stringify(o, ['fullCH', 'cityPY', 'cityInitialPY']))
        });
    }

    byId(id) {
        if(typeof id !=='number') throw new Error('invalid id');
        return this.cities[id % this.cities.length];
    }

    async travel(cityPair) {
        let LatLon = (await import('geodesy/latlon-ellipsoidal-vincenty.js')).default
        let [cityPos1, cityPos2] = cityPair.map(city => new LatLon(city.center.lat, city.center.lon));

        return {
            cities: cityPair.map(o => o.provCH + o.cityCH),
            distance: Math.round(cityPos1.distanceTo(cityPos2) / 1000),
            direction: cityPos1.initialBearingTo(cityPos2)
        }
    }
}


var cities = new Cities(require('./cities.json'));
console.log('City data loaded successfully!')
module.exports = cities;
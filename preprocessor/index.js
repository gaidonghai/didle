Districts = require('./class/Districts');
districts = new Districts(require('./data/districts.json'));

City=require('./class/ChineseCity');
geography = require('./data/geography.json');

//Process each city
cities = geography.map(cityGeoData => {
    let city=new City(cityGeoData)
    city.fillFromDistrict(districts);
    city.validityCheck();
    return city;
})

//Sort
cities.sort((a,b)=>a.code-b.code);

//DuplicateCheck
const assert=require('assert');
for(let i=1;i<cities.length;i++) {
    assert(cities[i].code-cities[i-1].code>0, `found duplicates in cities ${i}`);
}

module.exports = cities;
if (require.main === module) {
    const fs = require("fs");
    fs.writeFileSync('../backend/data/cities.json', JSON.stringify(cities, null, 2));
}
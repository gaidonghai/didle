let dimension = 200;

class City {
    constructor(cityData) {
        this.OBJECTID = cityData.properties.OBJECTID;
        this.GbCity = cityData.properties.GbCity;
        this.City_CH = cityData.properties.City_CH;
        this.City_EN = cityData.properties.City_EN;
        this.GbProv = cityData.properties.GbProv;
        this.Prov_CH = cityData.properties.Prov_CH;
        this.Prov_EN = cityData.properties.Prov_EN;

        // unify geometry
        if (cityData.geometry.type === "Polygon") {
            this.polygons = cityData.geometry.coordinates
        } else if (cityData.geometry.type === "MultiPolygon") {
            this.polygons = cityData.geometry.coordinates.map(o => o[0]);
        } else {
            throw "unknown geometry type"
        }

        //find the extremes of coordinates to create container box
        let boxes = this.polygons.map(findBoxPolygon);
        this.box = findBoxPolygon([].concat(...boxes));

        //helper
        function findBoxPolygon(polygon) {
            let x = polygon.map(o => o[0]);
            let y = polygon.map(o => o[1]);
            return [
                [Math.min(...x), Math.min(...y)],
                [Math.max(...x), Math.max(...y)],
            ]
        }

        //find the center of city
        //Use box center as an approximation
        //May be replaced by center of gravity or location of municipality
        this.center = {
            lat: (this.box[0][1] + this.box[1][1]) / 2,
            lon: (this.box[0][0] + this.box[1][0]) / 2
        }


    }

    async travelTo(destinationCity) {
        let LatLon = (await import('geodesy/latlon-ellipsoidal-vincenty.js')).default
        let city1 = new LatLon(this.center.lat, this.center.lon);
        let city2 = new LatLon(destinationCity.center.lat, destinationCity.center.lon);
        return {
            from: this.fullChinese,
            to: destinationCity.fullChinese,
            distance: Math.round(city1.distanceTo(city2) / 1000),
            direction: city1.initialBearingTo(city2)
        }
    }

    get fullChinese() {
        return this.Prov_CH + '|' + this.City_CH
    }

    get fullEnglish() {
        return this.Prov_EN + '|' + this.City_EN
    }


    get svgPolygons() {
        //create local polygons for shape drawing
        let boxCenter = {
            x: (this.box[0][0] + this.box[1][0]) / 2,
            y: (this.box[0][1] + this.box[1][1]) / 2,
        };
        let scaleFactor = Math.max(
            this.box[1][0] - this.box[0][0],
            this.box[1][1] - this.box[0][1],
        )

        function svgPolygonsFunc(polygon) {
            let points = polygon.map(point => {
                let [x, y] = point;
                [x, y] = [(x - boxCenter.x) / scaleFactor, (y - boxCenter.y) / scaleFactor];
                x = Math.round((x + 0.5) * dimension);
                y = Math.round((-y + 0.5) * dimension);
                return [x, y];
            });

            //Remove duplicated or close points.
            for (let i = points.length-1; i > 0; i--) {
                let curr=points[i];
                let prev=points[i-1];
                if((Math.abs(curr[0]-prev[0])+Math.abs(curr[1]-prev[1]))<2) delete points[i]
            }

            return points.map(o => o.join(',')).join(' ');
        }

        return this.polygons.map(svgPolygonsFunc)
    }

    get svg() {
        const {createSVGWindow} = require('svgdom')
        const window = createSVGWindow()
        const document = window.document
        const {SVG, registerWindow} = require('@svgdotjs/svg.js')

        // register window and document
        registerWindow(window, document)

        // create canvas
        const canvas = SVG(document.documentElement).size(dimension, dimension)

        // use svg.js as normal
        this.svgPolygons.forEach(o => canvas.polygon(o).fill('#111111'))

        // get your svg as string
        return canvas.svg();
    }
}


var cityData = require('./cityData.json');
let cities = {total: cityData.features.length, data: {}};
cityData.features.forEach(o => {
    let city = new City(o);
    cities.data[Number(city.OBJECTID)] = city;
})
cities.byId = function (n) {
    n = Number(n);
    n = n % this.total;
    if (n === 0) n = this.total;
    return cities.data[n];
}
cities.basics = function () {
    return Object.values(this.data).map(o => ({
        id: o.OBJECTID,
        provCh: o.Prov_CH,
        cityCh: o.City_CH,
        cityEn: o.City_EN
    }))
}
console.log('City data loaded successfully!')
module.exports = cities;
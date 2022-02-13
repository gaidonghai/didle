class City {
    constructor(cityData) {
        this.code = cityData.properties.Code;
        this.provCH = cityData.properties.Province;
        this.cityCH = cityData.properties.City;

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

    svgPolygons(dimension) {
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
            //Transformation
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
            points=points.filter(o=>o)

            //Only make sense if a polygon has >2 vertices
            if(points.length>2) return points.map(o => o.join(',')).join(' ');
        }

        return this.polygons.map(svgPolygonsFunc).filter(o=>o);
    }

    export() {
        return {
            code:this.code,
            provCH:this.provCH,
            cityCH:this.cityCH,
            center:this.center,
            svgPolygons:this.svgPolygons(200)
        }
    }
}


const fs = require("fs");
var GeoJSON = require('./行政边界_市级.json');
let cities = GeoJSON.features.map(o => new City(o))
let toExports=cities.map(o=>o.export());
module.exports=toExports

if (require.main === module) {
    fs.writeFileSync('../geography.json',JSON.stringify(toExports,null,2));
}

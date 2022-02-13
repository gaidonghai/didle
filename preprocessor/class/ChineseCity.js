const assert = require('assert');
const mandatories = ['code', 'provCH', 'cityCH', 'fullCH', 'center', 'svgPolygons', 'cityPY', 'cityInitialPY']

class ChineseCity {
    constructor(dataset) {
        mandatories.forEach(key => {
            try {
                this[key] = dataset[key]
            } catch {
            }
        });
    }

    fillFromDistrict(districts) {
        try {
            let cityCandidate = districts.searchOne('code', this.code)

            //市级名称检查
            assert(this.cityCH === cityCandidate["名称"] + cityCandidate["附加说明"] + cityCandidate["行政级别"], '市级名称错误！');

            //省级名称检查
            if (!this.isLevel1) {
                let provCandidate = districts.searchOne('ID', String(cityCandidate["父 ID"]));
                assert(this.provCH.indexOf(provCandidate["名称"]) >= 0, '省级名称错误！')
            }

            //确认无误，赋予拼音
            this.cityPY = cityCandidate.cityPY;
            this.cityInitialPY = cityCandidate.cityInitialPY;
        } catch (err) {
            console.log(this)
            throw ('一致性检查失败，未导入')
        }
    }

    get fullCH() {
        return this.isLevel1 ? this.cityCH : this.provCH + this.cityCH;
    }

    get isLevel1() {
        //是否为1级行政单位：台港澳京沪津渝
        if (this.code) return [710000, 810000, 820000, 110000, 310000, 120000, 500000].indexOf(this.code) >= 0
    }

    toJSON() {
        let res = {};
        mandatories.forEach(key => {
            res[key] = this[key]
        })
        return res;
    }

    validityCheck() {
        mandatories.forEach(key => {
            assert(this[key], `${key} do not exist`);
        })
        assert(this.svgPolygons.length >= 1, 'polygon do not exist')
        assert(typeof this.center.lat === 'number' && typeof this.center.lon === 'number', 'center value invalid')
    }
}

module.exports = ChineseCity;

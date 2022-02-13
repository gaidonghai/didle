class Districts {
    constructor(data) {
        this.data = data
    }

    searchOne(key, value) {
        let res = this.data.filter(o => o[key] === value);
        if (res.length !== 1) {
            console.log(key, value, res);
            throw('searchOne Failure')
        }
        return res[0];
    }
}

module.exports = Districts;

if (require.main === module) {
    //Test case
    const data=require('../data/districts.json');
    let k = new Districts(data);
    let result = k.searchOne('行政代码', '710000')
    console.log(result['名称'])
}

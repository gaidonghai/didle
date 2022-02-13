const fs = require('fs');

async function readData() {

    let csv = fs.readFileSync("./district-full.csv")
    let neatCsv = await import('neat-csv')
    neatCsv = neatCsv.default
    let headerString = "ID、名称、父 ID、拼音首字母、拼音首字母集合、拼音、附加说明、行政级别、行政代码、区号、排序"
    let result = await neatCsv(csv, {
        headers: headerString.split('、'),
        separator: '\t'
    });

    //Patches
    //依据http://www.mca.gov.cn/article/sj/xzqh/2020/2020/202101041104.html
    result.find(o => o["名称"] === "保山")["行政代码"] = '530500'; //原为 678000
    result.find(o => o["名称"] === "海东")["行政代码"] = '630200'; //原为 632100
    result.find(o => o["名称"] === "昌都")["行政代码"] = '540300'; //原为 542100
    result.find(o => o["名称"] === "哈密")["行政代码"] = '650500'; //原为 652200
    result.find(o => o["名称"] === "凉山")["行政代码"] = '513400'; //原为 615000
    result.find(o => o["名称"] === "日喀则")["行政代码"] = '540200'; //原为 542300
    result.find(o => o["名称"] === "吐鲁番")["行政代码"] = '650400'; //原为 652100

    result.find(o => o["名称"] === "阿克苏")["附加说明"] = ''; //原为 柯尔克孜
    result.find(o => o["名称"] === "昌吉")["附加说明"] = '回族'; //原为 <空白>
    result.find(o => o["名称"] === "和田")["附加说明"] = ''; //原为 哈萨克
    result.find(o => o["名称"] === "克孜勒苏")["附加说明"] = '柯尔克孜'; //原为 <空白>
    result.find(o => o["名称"] === "伊犁")["附加说明"] = '哈萨克'; //原为 <空白>

    //以下未见于官方文件
    result.find(o => o["名称"] === "西沙")["行政代码"] = '460321'; //原为 460300
    result.find(o => o["名称"] === "南沙" && o["父 ID"] === "358",)["行政代码"] = '460322'; //原为 460300

    result.map(o=>{
        o.code=Number(o["行政代码"]);
        o.cityPY=o["拼音"];
        o.cityInitialPY=o["拼音首字母集合"];
        return o
    })


    return result
}

module.exports = readData;

if (require.main === module) {
    async function run() {
        let res = await readData()
        fs.writeFileSync('../districts.json', JSON.stringify(res, null, 2));
    }

    run();
}

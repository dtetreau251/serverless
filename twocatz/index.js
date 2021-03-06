const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let name1 = req.query.name1
    let name2 = req.query.name2
    let name3 = req.query.name3
    let name4 = req.query.name4

    async function getCat(name) {
        let resp = await fetch("https://cataas.com/cat/says/" + name, { 
            method: "GET" 
        });
        let data = await resp.arrayBuffer();
        var base64data = Buffer.from(data).toString('base64');
        return base64data
    }

    let firstcat = await getCat(name1)
    let secondcat = await getCat(name2)
    let thirdcat = await getCat(name3)
    let fourthcat = await getCat(name4)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: firstcat,
            cat2: secondcat,
            cat3: thirdcat,
            cat4: fourthcat
        }
    };
}
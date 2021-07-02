const multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body;
    var parts = multipart.Parse(body, boundary);

    var result = await analyzeImage(parts[0].data);
    var emotions = result[0].faceAttributes.emotion;
    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));

    context.res = {
        body: {
           main_emotion
        }
    };
}


async function analyzeImage(img) {
    const subKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    })

    let urlToUse = uriBase + '?' + params.toString();
    console.log(urlToUse)
    let resp = await fetch(urlToUse, {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,

      	//ADD YOUR TWO HEADERS HERE
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subKey
        }
    })

    let data = await resp.json();
    return data;

}
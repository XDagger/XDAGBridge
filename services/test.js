const { Promise } = require('bluebird');
var request = require('request');

// var data = { "method": "xdag_version", "params": [], "id": 1 };

// request.post('http://127.0.0.1:7667', { json: data }, (error, response, body) => {
//     console.log(body);
// });


async function ttt() {
    var data = { "method": "xdag_version", "params": [], "id": 1 };
    var result = await new Promise(function (resolve, reject) {
        request.post('http://127.0.0.1:7667', { json: data }, (error, response, body) => {
            resolve({error:error, response:response, body:body});
        });
    });

    console.log(result.body);

}

ttt();
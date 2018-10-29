var fs = require('fs');
var axios = require('axios');
var request = require('request');


// fs.readFile(
//   './data.json', 
//   { encoding: 'utf8'}, 
//   function(err, data) {
//     console.log('Data loaded from disk', data);

//     axios.get('https://jsonplaceholder.typicode.com/todos/1')
//       .then(function(res) {
//         console.log('Data downloaded from url', res.data);
//       });
//   }
// );


/**
 * Sử dụng async await kết hợp với Promise để viết lại đoạn code trên. Gợi ý: Viết lại 1 async function làm 2 việc trên và chạy thử
 */

function readFilePromise(path){
  return new Promise(function(resolve, reject){
    fs.readFile(path, {encoding:'utf8'}, function(err, data){
      if (err){
        reject(err);
      }
      else{
        resolve(data);
      }
    });
  });
}


function readWeb(url){
  // console.log("inside readweb");
  return new Promise(function(resolve, reject){
    axios.get(url).then(res=>resolve(res.data)).catch(err=>reject(err));
  });
}

function load(url){
  return new Promise(function(resolve, reject){
    request(url, function(err, response, body){
      if(err){
        reject(err);
      }
      else{
        resolve(body)
      }
    });
  });
};

async function run(){
  var djs = await readFilePromise('./data.json');
  var dwb = await readWeb('https://jsonplaceholder.typicode.com/todos/1');
  // var dwb = await load('https://jsonplaceholder.typicode.com/todos/1');
  return [djs, dwb];
  // return [djs];
  // return [dwb];
}

run().then(e=>console.log(e)).catch(e=>console.log("error!:\n",e));
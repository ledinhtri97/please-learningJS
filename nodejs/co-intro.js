var fs = require('fs');
var co = require('co');

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

co(function*(){
	// var song1 = yield readFilePromise('./song1.txt');
	// var song2 = yield readFilePromise('./song2.txt');
	// var song3 = yield readFilePromise('./song3.txt');
	// return [song1,song2,song3];

	var values = yield [
		readFilePromise('./song1.txt'),
		readFilePromise('./song2.txt'),
		readFilePromise('./song3.txt')
	];
	return values;
}).then(function(values){
	console.log(values);
}).catch(function(err){
	console.log(err);
});


var readFiles = co.wrap(function*(files){
	var values = yield files.map(e => readFilePromise(e));
	return values;
});


readFiles(['song1.txt','song2.txt','song3.txt'])
	.then(e=>console.log(e));
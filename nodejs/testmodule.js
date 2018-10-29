var fs = require('fs');

fs.writeFileSync('./path.txt', 'trimo');

switch('A'){
	case 'a' :console.log(1); break;
	case 'A' :console.log(2); break;
	default : 0; break;
};
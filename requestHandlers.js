var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response) {
	console.log('Request handler "start" was called');

	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html" charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data" method="POST">'+
	'<input type="file" name="upload">'+
	'<hr>'+
	'<button type="submit">Upload file</button>'+
	'</form>'+
	'</body>'+ 
	'</html>';

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(body);
	response.end();
}

function upload(response, request) {
	console.log('Request handler "upload" was called');

	form = new formidable.IncomingForm();
	console.log('About to parse.');

	form.parse(request, function (error, fields, files) {
		console.log('Parsing done.');
		fs.rename(files.upload.path, 'tmp/test.png');
	})

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('Received image: <br> <img src="/show">');
	response.end();
}

function show(response) {
	console.log('Request handler "show" was called.');
	response.writeHead(200, {'Content-Type': 'image/png'});
	fs.createReadStream('./tmp/test.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;


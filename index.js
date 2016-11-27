var mysql          =        require('mysql');
var express = require('express');
var app  		   =	    module.exports = express();
var bodyParser     =        require("body-parser");
//sql
var SerialPort = require('serialport');
//var port = new SerialPort('COM9',{baudRate: 9600,parser: SerialPort.parsers.readline("\n")});
var ic1 = 1.74;
app.use(express.static(__dirname +'/public' ));

/*port.on('open', function(){
  console.log('Serial Port ABIERTO');
  port.on('data', function(data){
      console.log(data.toString());
      //console.log('Datos de arduino impresos');
  });
});
*/


var client = mysql.createConnection({
  user: 'root',
  password: '',
  host: 'localhost',
  port: '3306',
  database : 'operationalAmplifier'//miguelcalifame
});
client.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());



app.post('/', function (req, res) {
  console.log('POTATOE');
  res.send('Got a POST request');
});
app.get('/',function(req,res){

	res.sendfile(__dirname + '/test.html');

});

app.post('/up', function(req, res){
console.log('A '+String(100)+ 'E');
			port.write('A '+String(100)+ 'E'+'F', function(err, results) {
    			//console.log("err: " + err);
    			//console.log("results: " + results);
  				
  				
				

  			});	

});
app.post('/down', function(req, res){
console.log('A '+String(100)+ 'E'+'F');
			port.write('A '+String(100)+ 'E'+'F', function(err, results) {
    			//console.log("err: " + err);
    			//console.log("results: " + results);
  				
  				
				
  			});	

});
app.post('/recargarArduino', function(req, res){
	var ic = req.body.ic;
	res.end();
	sql = "INSERT INTO `mediciones` (`fecha`, `iref`, `ic`, `ganancia`, `puntoq`) VALUES (CURRENT_TIMESTAMP, '"+String(ic/11)+"', '"+String(ic)+"', '0', '0');";
  		console.log(sql);
  		client.query(sql,function(err,rows){

  			
				});
	
	console.log('Recargando datos al arduino');
	console.log('IC NUEVA DE '+ic);
	ic = ic;
	//console.log('IC ENVIADO DE '+'A '+String(ic)+'E');
	/*
	for(var i=0; i<ic.length; i++){
        port.write(new Buffer(ic[i], 'ascii'), function(err, results) {
            // console.log('Error: ' + err);
            // console.log('Results ' + results);
        });
    }*/
	//subida 0.02
	if(ic1<ic){
	  console.log('menor');
	  console.log('actual -> :) ic1=' +ic1 + '   IC = '+ic );
	var iterando = 0;
	  while(ic1<=ic){ 
	  	ic1 = parseFloat(ic1)+ parseFloat(0.01);
		iterando++;	
		console.log('load sumando-->' +iterando + '  IC1-->  '+ic1+'   IC-->   '+ic );
		}
		ic1 = ic;
		console.log('A'+String(iterando)+ 'E'+'F');
			port.write('A'+String(iterando)+ 'E'+'F', function(err, results) {
    			//console.log("err: " + err);
    			//console.log("results: " + results);
  				
  				
				
  			});	
  			//console.log('IC1 ='+ic1+'  IC = '+ic);		
  				console.log('LISTO :) ic1=' +ic1 + 'IC = '+ic );
  				console.log('A '+String(iterando)+ 'E'+'F');
	}else if(ic1>ic){
		console.log('mayor');
		console.log('LISTO :) ic1=' +ic1 + 'IC = '+ic );
		iterando = 0;
	 while(ic1>=ic){ 
	  	ic1 = parseFloat(ic1)- parseFloat(0.01);
		iterando++;	
		console.log('load --> restando ' +iterando  + '  IC1-->  '+ic1+'   IC-->   '+ic);
		}
		ic1 = ic;
		console.log('A '+String(iterando)+ 'E');
			port.write('A'+String(iterando)+'E', function(err, results) {
    			//console.log("err: " + err);
    			//console.log("results: " + results);
  				
  //				console.log('LISTO :) ic1=' +ic1 + 'IC = '+ic );
				
  			});	
  			//console.log('IC1 ='+ic1+'  IC = '+ic);	
	console.log('LISTO :) ic1=' +ic1 + 'IC = '+ic );
	console.log('A '+String(iterando)+ 'E');
	} 
	  

	

});

app.post('/alimento', function(req, res){

/**********HEADERS DONT TOUCH *************************///
		    // Website you wish to allow to connect
		    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000/alimento');

		    // Request methods you wish to allow
		    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		    // Request headers you wish to allow
		    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		    // Set to true if you need the website to include cookies in the requests sent
		    // to the API (e.g. in case you use sessions)
		    res.setHeader('Access-Control-Allow-Credentials', true);
		//************END HEADERS ********************************///
		console.log("potasio");

		sql = "SELECT * FROM `mediciones` ORDER BY `fecha` DESC";
  		//console.log(sql);
  		client.query(sql,function(err,rows){

  			res.contentType('application/json');
					res.send(rows);
					res.end();
				});


});
app.listen(8000);
console.log('app listen in port 8000');
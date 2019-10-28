const express = require('express');
var request = require('request');
const app = express();
const port = 80;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/prueba/', (req, res) => {
  request('http://softbar.e-docperu.com/Registros/procGeneralWebHook?parametros=mdwadawdad|1&nombreProcedimiento=ProcProducto&indice=19', function (error, response, body) {
    
    var rptaJSON = JSON.parse(body);
    rptaJSON.forEach(element => { 
      console.log(element.NomProducto); 
    });
  });
});

app.post('/webhook', (req, res) => {
  
  //var textoRecibido = req.body.queryResult.parameters["echoText"];
  console.log(req);
  console.log("mensaje recibidooo");

  let respuestaParaChat = {
    "fullfillmentText" : "rpta",
    "fulfillmentMessages" : [{"text":{"text": [ "hola desde el NODEJS"] }}],
    // "fulfillmentMessages" : [{"text":{"text": ["7777","jjejejej"] }}, {"text":{"text": ["555","rffdd"] }}],
    "source": ""
  };
  res.json(respuestaParaChat);

  // request('http://softbar.e-docperu.com/Registros/procGeneralWebHook?parametros=m|1&nombreProcedimiento=ProcProducto&indice=19', function (error, response, body) {
  //   var rptaJSON = JSON.parse(body);
  //   var productosEncontrados = "";
  //   rptaJSON.forEach(element => { 
  //     productosEncontrados += "\n- " + element.NomProducto + ' S/. *' + element.PrecioVenta + '*';
  //   });
  //   let respuestaParaChat = {
  //     "fullfillmentText" : "rpta",
  //     "fulfillmentMessages" : [{"text":{"text": [productosEncontrados] }}],
  //     // "fulfillmentMessages" : [{"text":{"text": ["7777","jjejejej"] }}, {"text":{"text": ["555","rffdd"] }}],
  //     "source": ""
  //   };
  //   res.json(respuestaParaChat);
  // });
});


app.listen(port, () => console.log(`Running on port ${port}`));
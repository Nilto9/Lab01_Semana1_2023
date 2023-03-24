import http from "http";
// "fs" permite leer archivos del sistema
import fs from "fs";

const urlObj = {
  "/": "index",
  "/contacto": "contacto",
  "/catalogo": "catalogo",
  "/nosotros": "nosotros",
  "/servicios": "servicios",
};

const mostrar = (res, dir) => {
  fs.readFile(`./${dir}.html`, (error, pagina) => {
    if (error) {
      res.end(error.message);
    }
    res.write(pagina);
    res.end();
  });
};

const handler = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  let keys = Object.keys(urlObj);
  let url = req.url;
  //Iteracion para luego comparar la url con la key del objecto
  try {
    console.log("ruta actual: "+ url);
    for (let i = 0; i < keys.length; i++) {
      if (url === keys[i]) {
        mostrar(res, urlObj[keys[i]]);
      }
    }
  } catch (e) {
    console.log("Hay un error en la url: " + url + ", Error: " + e);
    res.write("Error: " + e);
  }
};

const servidor = http.createServer(handler);
servidor.listen(8080);

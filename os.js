const fs = require("fs");

function match(a) {
  const myregex = /[0-9]{7,8}/g;
  return a.match(new RegExp(myregex));
}
//
function registroAsistencia() {
  fs.readFile("chat.txt", "utf-8", (error, data) => {//leemos el chat de "zoom"
    if (!error) {//si no hay error proseguimos
      let coincidencias = match(data); //array de dnis 7 u 8 numeros de largo
      fs.readFile("listaAlumnos.json", "utf-8", (error, data) => {//traemos listaAlumnos como string
        if (!error) {
          let alumnos = JSON.parse(data);//pasamos a objetos lo que viene de listaAlumnos
          Object.keys(alumnos).forEach((DNI) => {//iteramos el objeto
            if (coincidencias.includes(DNI)) {
              //e=DNI
              alumnos[DNI].push(1);//presente
            } else {
              alumnos[DNI].push(0);//ausente
            }
            fs.writeFile(//sobreescribimos lista Alumnos.json
              "listaAlumnos.json",
              JSON.stringify(alumnos, null, 4),//transformamos el objeto a un string
              (error) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          });
        } else {
          console.log(error);
        }
      });
    } else {
      console.log(error);
    }
  });
}
registroAsistencia();

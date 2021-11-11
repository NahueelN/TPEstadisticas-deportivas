const { Console } = require('console')
const fs = require('fs')

const archivo = (nombre, delimitador) => {
  const contenido = fs.readFileSync(nombre).toString()
  return contenido.split(delimitador)
}

const equipoA = archivo('basket/equipo-A.txt', '\n')
const equipoB = archivo('basket/equipo-B.txt', '\n')
const partido = archivo('basket/partido.log', '\n')

// {
//   apellido o nombre: puntos,
//   apellido o nombre: puntos
// }
const puntosEquipo = (registro, equipo) => {
  const registroEquipo = registro.filter(anotacion => {
    // "APELLIDO,TIPO"
    let apellido = anotacion.split(',')[0]
    let apellidos = equipo.map(nombreCompleto => nombreCompleto.split(" ")[1])
    
    return apellidos.includes(apellido)
  })
  let goleador 
  let pgoleador =0
  const puntos = {}
  let total = 0
  registroEquipo.forEach(anotacion => {
    const apellido = anotacion.split(",")[0] 
    let tanto = anotacion.split(",")[1]
    tanto = (tanto === 'DOBLE') ? 2 : 3
    puntos[apellido] = puntos[apellido] || 0
    puntos[apellido] += tanto 
    
    total += tanto
    if (pgoleador<puntos[apellido])
    goleador=apellido
    pgoleador=puntos[apellido]
    
  })
  return {
    total,
    puntos,
   
  }
}

//console.log((()=>{return"null"})()|| "hello")
const puntosEquipoA = puntosEquipo(partido, equipoA)
const puntosEquipoB = puntosEquipo(partido, equipoB)

const jGoleador=(puntosA,puntosB)=>{
  let goleador=""
  let pGoleador=0
  i=0 
  let lenB=Object.values(puntosB.puntos).length;
  let lenA=Object.values(puntosA.puntos).length;
  while(i<lenB){
    aux=equipoB[i].split(" ")[1]
    if(puntosB.puntos[aux]>pGoleador){
      goleador=equipoB[i]
      pGoleador=puntosB.puntos[aux]
    }
    i++
  }
  i=0
  while(i<lenA){
    aux=equipoA[i].split(" ")[1]
    if(puntosA.puntos[aux]>pGoleador){
      goleador=equipoA[i]
      pGoleador=puntosA.puntos[aux]
    }
    i++
  }
  
  
  console.log("el goleador es: "+goleador+": "+pGoleador)
  

}
jGoleador(puntosEquipoA,puntosEquipoB)

console.log(puntosEquipoA, puntosEquipoB)



const distribucionDePuntaje = () => {
  let cantDobles=0
  let cantTriple=0
  partido.forEach(puntaje=>{
    puntos=puntaje.split(",")[1]
   
    if (puntos=="DOBLE"){
      cantDobles=cantDobles+1
    }
    else{
      cantTriple=cantTriple+1
    }
  })
  console.log("cantidad de puntos dobles: "+cantDobles)
  console.log("cantidad de puntos tripes: "+cantTriple)
}
distribucionDePuntaje()


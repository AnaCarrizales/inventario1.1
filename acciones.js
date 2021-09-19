export default class Acciones 
{
  constructor() 
  {
    this.contador = 0;
  }
  
  mandar(action) 
  {
    this.contador++;
    let table = document.querySelector("#tablaAcciones");
    let row = table.insertRow(-1);
    let colAction = row.insertCell(-1);
    row.setAttribute("id", `row${this.contador}`);
    colAction.setAttribute("id", `colAct${this.contador}`);
    colAction.innerHTML = action;
  }
}
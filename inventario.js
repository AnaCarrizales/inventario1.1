import Producto from "./producto.js";
import Acciones from "./acciones.js";
class Inventario 
{
  constructor() 
  {
    this.cargarBotones()
    this.inventario = new Array();
    this.acciones = new Acciones()

    let btnInpAdd = document.querySelector("#btnRegistrar");
    let btnListar = document.querySelector("#btnAcomodar");
    let btnInversa  = document.querySelector("#btnInversa");
    let btnReemplazar = document.querySelector("#btnReemplazar")
    let btnLimpiarAcciones = document.querySelector("#borrarAcciones");
    this.btnAddProduct = btnInpAdd.addEventListener("click", this.agregarProducto);

    btnListar.addEventListener("click", this.listar)
    btnInversa.addEventListener("click", this.listaInvertida)
    btnReemplazar.addEventListener('click', this.reemplazar)
    btnLimpiarAcciones.addEventListener('click', this.borrarAcciones);
  }
  agregarProducto = () => 
  {
    
    let passAdd = false;
    let producto = Producto.crearProducto();
    if(producto == isNaN)
    {
      Swal.fire('Error','No se admiten IDs con código 0', 'error');
      return false;
    }
    
    if (producto) 
    {
      passAdd = this.limiteInventario(producto);
    }
    
    if(!producto)
    {
      Swal.fire('Chale', 'Datos faltantes, inténtalo de nuevo', 'error');
    }
    
    if(passAdd) 
    {
      this.inventario.push(producto);
      this.acciones.mandar(`EL producto ${producto.getName()} con el id: ${producto.getId()} fue agregado`)
      Swal.fire('Correcto', 'El producto fue agregado', 'success');
    }
    
    if(!passAdd) 
    {
      this.acciones.mandar('No se ha agregdo el producto');
      Swal.fire('Error', `El producto con el id: ${producto.getId()} ya ha sido agregado`, 'error')
    }
  };
 
  limiteInventario(producto)
  {
    if(this.inventario.length < 20)
    {
      return this.noRepeatId(producto);
    } 
    else 
    {
      this.acciones.mandar('Inventario Lleno')
      Swal.fire('Error', 'El inventario ha alcanzado su limite', 'error')
      return false;
    }
   
  }
 
  noRepeatId(producto)
  {
    let pass = true;
    for(let i=0; i<this.inventario.length; i++)
    {
      if(this.inventario[i].getId() === producto.getId())
      {
        pass = false;
      }
    }
    return pass
  }

  listar = () => 
  {
    let producto;
    this.limpiar()
    if(this.inventario.length !== 0)
    {
      for(let i=0; i<this.inventario.length; i++)
      {
        if(this.inventario[i] !== null)
        {
          producto = this.inventario[i]
          this._mostrarLista(producto)
        }
      }
    }
    this.acciones.mandar('Enlistado')
  }

  listaInvertida = () => 
  {
    let max = this.inventario.length
    let count = max
    this.limpiar()
    if(this.inventario.length !== 0)
    {
      for(let i=0; max > i; i++)
      {
        count--
        if(this.inventario[count] !== null)
        {
            this._mostrarLista(this.inventario[count])
        }
      }
    }
    this.acciones.mandar('Enlistado inverso') 
  }


    buscarProducto = () =>  
    {
        let inpIdToBrowse = document.querySelector("#idNav");
        let idToBrowse = inpIdToBrowse.value;
        if (idToBrowse) 
        {
            let buscarProducto = this.navegar(idToBrowse);
            if(buscarProducto !== false && buscarProducto !== undefined)
            {
                Swal.fire("En existencia",`producto: ${buscarProducto.getName()}`,"success");
                this.acciones.mandar(`Se encontró el producto ${buscarProducto.getName()}`)
            }
            else if(!buscarProducto)
            {
                Swal.fire("Lo sentimos",`el producto con id: ${idToBrowse}, no existe`,"error");
            }
        } 
        else
        {
            Swal.fire("Error", "No ingresaste ningun codigo", "error");
        }
    };
  
    navegar(id) 
    {
        for (let i = 0; i < this.inventario.length; i++) 
        {
            if (this.inventario[i].getId() === id) 
            {
                return this.inventario[i]
            }
        }
        return false;
    }

    cargarBotones = () => 
    {
        let column = document.querySelector("#btns")
        let colList = document.querySelector("#btnListar")
        let btnDelete = document.createElement("input");
        let btnNav = document.createElement("input");
        let btnListar = document.createElement("input");
        let btnInversa = document.createElement("input");

        btnInversa.setAttribute('type', 'button');
        btnInversa.setAttribute('value','Listar Inverso');
        btnInversa.setAttribute('id', 'btnInversa');
        btnInversa.setAttribute("class", `button`);

        btnNav.setAttribute('type', 'button');
        btnNav.setAttribute('value', 'Buscar');
        btnNav.setAttribute("id", `btnNav`);
        btnNav.setAttribute("class", `button`);

        btnDelete.setAttribute('type', 'button');
        btnDelete.setAttribute('value', 'Eliminar');
        btnDelete.setAttribute("id", `btnDelete`);
        btnDelete.setAttribute("class", `button`);

        btnListar.setAttribute('type', 'button');
        btnListar.setAttribute('value', 'Listar Normal')
        btnListar.setAttribute('id', 'btnAcomodar')
        btnListar.setAttribute("class", `button`);

        btnDelete.addEventListener('click', () => 
        {
            this.eliminar();
        })

        btnNav.addEventListener('click', () => 
        {
            this.buscarProducto();
        })

        column.appendChild(btnDelete);
        column.appendChild(btnNav)
        colList.appendChild(btnListar)
        colList.appendChild(btnInversa)
    }

  reemplazar = () => {
    let idToChange = document.getElementById("id").value;
    let numUpdate = this.getPositionId(idToChange)
    console.log(idToChange)
    if(this.navegar(idToChange)) 
    {
      let producto = Producto.crearProducto();
        if(producto)
        {
          this.acciones.mandar(`se reemplazó el producto ${this.inventario[numUpdate].getName()} por el nuevo ${producto.getName()}`)
          this.inventario[numUpdate] = producto;
          Swal.fire('Correcto', 'Se reemplazó el producto', 'success');
          this.listar()
          return;
        }
        else 
        {
            Swal.fire('Error', 'Faltan datos del producto ', 'error')
        }
    } 
    else 
    {
      Swal.fire('Error', 'No existe este espacio en el inventario', 'error')
    }
  }

  limpiar()
    {
        let table = document.querySelector("#lista");
        table.innerHTML = '<tr><th id="producto">Producto</th><th id="id">ID</th><th id="amount">Cantidad</th><th id="precio">Precio</th><th id="precioTotal">Precio Total</th></tr>'
    }  
    
    _mostrarLista = (producto) =>
    {
        let table = document.querySelector("#lista");
        let row = table.insertRow(-1);
        let colName = row.insertCell(0);
        let colId = row.insertCell(1);
        let colCantidad = row.insertCell(2);
        let colPrecio = row.insertCell(3)
        let colPrecioTotal = row.insertCell(4);

        row.setAttribute('id', `row${producto.getId()}`);
        colName.setAttribute('id', `colName${producto.getId()}`);
        colId.setAttribute('id', `colId${producto.getId()}`);
        colCantidad.setAttribute('id', `colCantidad${producto.getId()}`);
        colPrecio.setAttribute('id', `colPrecio${producto.getId()}`);
        colPrecioTotal.setAttribute('id', `colPrecioTotal${producto.getId()}`);

        colName.innerHTML = producto.getName();
        colId.innerHTML = producto.getId();
        colCantidad.innerHTML = producto.getCantidad();
        colPrecio.innerHTML = producto.getPrecio();
        colPrecioTotal.innerHTML = producto.getCantidad() * producto.getPrecio();
    }
  
    borrarAcciones = () =>
    {
        let table = document.querySelector('#tablaAcciones');
        table.innerHTML = "<tr><th>Acciones</th></tr>"
    }

  eliminar = () => {
    let inpIdToDelete = document.querySelector("#idNav");
    let idToDelete = inpIdToDelete.value;
    if(!idToDelete)
    {
      Swal.fire('Error', 'No hay nigún codigo que borrar', 'error')
    }

    if(!this.navegar(idToDelete))
    {
      Swal.fire('Error', 'No existe el producto', 'error');
    }

    let position = this.getPositionId(idToDelete)
    let nextPosition = position + 1;
    console.log(position, nextPosition)
    while(nextPosition < this.inventario.length)
    {
      let move = this.inventario[position]
      this.inventario[position] = this.inventario[nextPosition];
      this.inventario[nextPosition] = move
      position++;
      nextPosition++;
    }

    let borrar = this.inventario.pop()
    Swal.fire('Excelente', `Producto ${borrar.getName()} con id: ${borrar.getId()} ha sido eliminado`, 'success');
    this.accioness.mandar(`El producto id:${borrar.getId()}, name: ${borrar.getName()} ha sido eliminado`, 'success');
  }

  getPositionId(id)
  {
    for(let i = 0; i < this.inventario.length; i++){
      if(this.inventario[i].getId() == id){
        return i;
      }
    }
  }
   
}
new Inventario();
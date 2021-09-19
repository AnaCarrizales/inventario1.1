export default class Producto 
{
    constructor(id, name, cantidad, precio, valorProductos) {
      this.id = id;
      this.name = name;
      this.cantidad = cantidad;
      this.precio = precio;
      this.valorProductos = valorProductos;
    }

    getId() 
    {
      return this.id;
    }

    getName() 
    {
      return this.name;
    }

    getPrecio() 
    {
      return this.precio;
    }
    
    getCantidad() 
    {
      return this.cantidad;
    }

    static crearProducto() 
    {
      let inpId = document.querySelector("#id");
      let inpName = document.querySelector("#name");
      let inpCantidad = document.querySelector("#cantidad");
      let inpPrecio = document.querySelector("#precio");
      let id = inpId.value;
      let name = inpName.value;
      let cantidad = inpCantidad.value;
      let precio = inpPrecio.value;
    
      if((id % 1 == 0 && id >= 0)) 
      {
        if (id && name && cantidad && precio) 
        {
          let valorProductos = cantidad * precio;
          let producto = new Producto(id, name, cantidad, precio, valorProductos);
          inpId.value = "";
          inpName.value = "";
          inpCantidad.value = "";
          inpPrecio.value = "";
          return producto;
        } 
        else 
        {
          return false;
        }
      } 
      else 
      {
        return isNaN
      }
  
    }
}
  
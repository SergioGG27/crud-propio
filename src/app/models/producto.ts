export class Producto{
    _id?: number;
    producto: string;
    categoria: string; 
    ubicacion: string;
    precio: number;
    
    constructor(producto:string, categoria:string, ubicacion:string, precio: number){
        this.producto = producto;
        this.categoria = categoria ; 
        this.ubicacion = ubicacion;
        this.precio = precio;
    }
}
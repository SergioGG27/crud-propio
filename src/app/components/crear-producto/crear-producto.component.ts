import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscriber } from 'rxjs';
import {Producto} from 'src/app/models/producto'
import { ProductoService } from 'src/app/services/producto.service';
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService, 
              private _productoService:ProductoService, 
              private aRouter : ActivatedRoute) { // Esta clase es para obtener el Id, hay mas propiedades.
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    //console.log(this.productoForm); se hace en la primera fase para ver como va el codigo

    const DATA_PRODUCTO : Producto = {

      producto: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }

    if(this.id !== null){
      //editamos producto
      this._productoService.editarProducto(this.id, DATA_PRODUCTO).subscribe(data =>{
          this.toastr.info('Producto fue actualizado Correctamente!', 'Producto Actualizado!');
          this.router.navigate(['/']);
      }, error =>{
          console.log(error);
          this.productoForm.reset();
      })
    }else{
      //agregamos producto
      console.log(DATA_PRODUCTO);
      this._productoService.guardarProducto(DATA_PRODUCTO).subscribe(data=>{
          this.toastr.success('El producto fue registrado con exito','Producto Registrado!');
          this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }

     

  }
  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data=>{
        this.productoForm.setValue({
          producto: data.producto,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }
  }
}

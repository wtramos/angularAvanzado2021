import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product.model';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ProductComponent } from 'src/app/global/components/product/product.component';
import { LoaderComponent } from 'src/app/global/components/loader/loader.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'description', 'brand', 'image', 'amount', 'currencyType', 'action'];
  data:any;
  // dataSource!: MatTableDataSource<any>;
  closeModal: any;

  posicionHorizontal: MatSnackBarHorizontalPosition = 'right';
  posicionVertical: MatSnackBarVerticalPosition = 'top';
  duracionSegundos = 4;
  codigoMensajeError = 0;
  codigoMensajeInformacion = 1;
  codigoMensajeExito = 2;

  // @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  products: Product[] = [];
  productObserver: any;
  product: FormControl = new FormControl();
  brandList: string[] = [];
  productDetail: FormGroup;
  productSelected: Product | null = null;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.productDetail = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      image: [null, [Validators.required, Validators.minLength(8)]],
      amount: [null, [Validators.required, Validators.minLength(1)]],
    })
  }

  //TODO: Agregar registros en el FireBase en la colección de products.
  //TODO: Mostrar la data de la colección products en la página web.
  ngOnInit(): void {
    this.dialog.open(LoaderComponent);
    this.getProducts();
    this.productObserver = this.productService.getProductsRealTime$().subscribe(
      next => {
        //console.log(next);
        this.products = next;
        this.products.forEach((product) => {
          if (!this.brandList.includes(product.brand)) {
            this.brandList.push(product.brand);
          }
        });
        this.dialog.closeAll();
      },
      error => {
        this.dialog.closeAll();
        console.log(error);
      },
      () => {
        this.dialog.closeAll();
        console.log("completed");
      }
    )
  }

  ngOnDestroy(): void {
    this.productObserver.unsubscribe();
  }

  getProducts() {
    this.productService.getProducts().then(products =>{
      this.products = products;
      // this.dataSource  = new MatTableDataSource(this.products);
      // this.dataSource.paginator = this.paginator;
    });
  }

  create(){
    this.openDialog('Product Registration', {});
  }

  searchByBrand(){
    try {
      this.productService.getProductByBrand(this.product.value).then(productsFiltered => {
        this.products = productsFiltered;
        // this.dataSource  = new MatTableDataSource(this.products);
        // this.dataSource.paginator = this.paginator;
      });
    } catch (error) {
      throw Error(error);
    }
  }

  selectProduct(product: Product, i: number): void{
    this.productDetail.controls.name.setValue(product.name);
    this.productDetail.controls.description.setValue(product.description);
    this.productDetail.controls.image.setValue(product.image);
    this.productDetail.controls.amount.setValue(product.price.amount);
    //console.log(this.productDetail);

    this.productSelected = product;
    //product.name != this.products[i].name
  }

  /*
  update(): void {
    if (this.productDetail.invalid){
      return;
    }
    
    const { name, description, image, amount } = this.productDetail.controls;
    if (name.value === this.productSelected?.name ||
        description.value === this.productSelected?.description ||
        image.value === this.productSelected?.image ||
        amount.value === this.productSelected?.price?.amount){
        return;
    }

    this.productSelected!.name = name.value;
    this.productSelected!.description = description.value;
    this.productSelected!.image = image.value;
    this.productSelected!.price.amount = amount.value;

    console.log(this.productSelected);

    this.productService.updateProduct(this.productSelected!);
  }
  */

  openDialog(action, obj) {
    this.productSelected = obj;
    obj.action = action;
    const dialogRef = this.dialog.open(ProductComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Product Registration') {
        this.addRowData(result.data);
      }else if (result.event == 'Product Update') {
        this.updateRowData(result.data);
      }else if (result.event == 'Product Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  private async addRowData(row_obj){
    const newProduct: Product = {
      name: row_obj.name,
      brand: row_obj.brand,
      description: row_obj.description,
      image: row_obj.image,
      offert: {
        isOffert: false,
        type: "1",
        value: 0
      },
      price: {
        amount: row_obj.amount,
        currencyType: row_obj.currencyType
      }
    };
    
    const response = await this.productService.createProduct(newProduct).then
    (response => {
      if (response.success){
        const mensaje = "Successful recording!";
        this.openSnackBar(mensaje, "Product Registration", this.codigoMensajeExito);
        this.getProducts();
      }}).catch(error => {
        this.openSnackBar(error.message, "Product Registration", this.codigoMensajeError);
      }); 
     return true;
  }

  private async updateRowData(row_obj){
    this.productSelected!.brand = row_obj.brand;
    this.productSelected!.name = row_obj.name;
    this.productSelected!.description = row_obj.description;
    this.productSelected!.image = row_obj.image;
    this.productSelected!.price.amount = row_obj.amount;
    this.productSelected!.price.currencyType = row_obj.currencyType;

    const response = await this.productService.updateProduct(this.productSelected!).then(response => {
    if (response.success){
      const mensaje = "Successful recording!";
      this.openSnackBar(mensaje, "Product Update", this.codigoMensajeExito);
    }}).catch(error => {
      this.openSnackBar(error.message, "Product Update", this.codigoMensajeError);
    });
    return true;
  }

  private async deleteRowData(row_obj){
    this.productSelected!.name = row_obj.name;
    const response = await this.productService.deleteProduct(this.productSelected!).then(response => {
    if (response.success){
      const mensaje = "Successful removal!";
      this.openSnackBar(mensaje, "Product Delete", this.codigoMensajeExito);
      this.getProducts();
    }}).catch(error => {
      this.openSnackBar(error.message, "Product Delete", this.codigoMensajeError);
    });
    return true;
  }

  openSnackBar(message: string, action: string, codigo: number) {
    this.snackBar.open(message, action, {
      duration: this.duracionSegundos * 1000,
      horizontalPosition: this.posicionHorizontal,
      verticalPosition: this.posicionVertical,
      panelClass: this.styleMessage(codigo)
    });
  }

  styleMessage(codigo: number){
    switch(codigo) { 
      case this.codigoMensajeError: return 'estilo-mensaje-error';
      case this.codigoMensajeInformacion: return 'estilo-mensaje-informacion';
      default: return 'estilo-mensaje-exito';
    }
  }
}
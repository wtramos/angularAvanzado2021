import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product.model';
import { MatDialog } from '@angular/material/dialog';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatToolbar } from '@angular/material/toolbar';
import { LoaderComponent } from 'src/app/global/components/loader/loader.component';
import { ProductShoppingcartComponent } from 'src/app/global/components/product-shoppingcart/product-shoppingcart.component';

@Component({
  selector: 'app-home-shoppingcart',
  templateUrl: './home-shoppingcart.component.html',
  styleUrls: ['./home-shoppingcart.component.scss']
})
export class HomeShoppingcartComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'description', 'brand', 'image', 'amount', 'currencyType', 'action'];
  data:any;
  closeModal: any;

  slides = [
    {'image': 'https://www.centralcomputer.com/media/magestore/bannerslider/images/b/a/back_to_school-01.jpg'}, 
    {'image': 'https://www.centralcomputer.com/media/magestore/bannerslider/images/2/1/21q2-15_channel_enthusiast_specialty_bundle_en_altsizes_1180x350.png'},
    {'image': 'https://www.centralcomputer.com/media/magestore/bannerslider/images/b/a/back_to_school-01.jpg'}, 
    {'image': 'https://www.centralcomputer.com/media/magestore/bannerslider/images/w/e/webbanner_color_your_drive.jpg'}, 
    {'image': 'https://www.centralcomputer.com/media/magestore/bannerslider/images/3/0/3080ti_cpu_bun_50.png'}
  ];

  products: Product[] = [];
  productObserver: any;
  product: FormControl = new FormControl();
  brandList: string[] = [];
  productSelected: Product | null = null;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
  }
  
  ngOnInit(): void {
    this.dialog.open(LoaderComponent);
    this.getProducts();
    this.productObserver = this.productService.getProductsRealTime$().subscribe(
      next => {
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
    });
  }

  searchByBrand(){
    try {
      this.productService.getProductByBrand(this.product.value).then(productsFiltered => {
        this.products = productsFiltered;
      });
    } catch (error) {
      throw Error(error);
    }
  }

  selectProduct(product: Product, i: number): void{
    this.productSelected = product;
  }

  openDialog(obj) {
    this.productSelected = obj;
    const dialogRef = this.dialog.open(ProductShoppingcartComponent, {
      width: '800px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
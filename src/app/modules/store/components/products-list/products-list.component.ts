import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { webStoreState } from 'src/app/store/storeReducers';
import { getProducts } from 'src/app/store/storeActions';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: any = [];
  productOrg = []
  selectedFilter = 'asc';

  filterOptions = [
    { value: "asc", label: 'Name : A - Z' },
    { value: "desc", label: 'Name : Z - A' },
    { value: "priceLow", label: 'Price : Low to High' },
    { value: "priceHigh", label: 'Price : High to Low' }
  ]
  searchData: string = '';
  constructor(
    private store: Store<{
      webStore: webStoreState
    }>,
    public productService: ProductsService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params: any) => {
        if (params.category) {
          this.getProductsByCategory(params.category);
        } else {
          this.getProducts();
        }
        console.log(params);
      }
      );
  }

  getProducts(): any {
    this.productService.getProducts().subscribe((productData: any) => {
      productData?.products.map((product:any) => product.currency = 'USD');
      this.productOrg = productData?.products;
      this.products = productData?.products;
      this.onFilterChange('asc');
      this.store.dispatch(getProducts({ payload: { products: JSON.parse(JSON.stringify(this.products)) } }))
    }, (err) => {
      console.log('Error while fetching product Details')
    })
  }

  getProductsByCategory(categoryName: string): any {
    this.productService.getProductByCategory(categoryName).subscribe((productData: any) => {
      productData?.products.map((product:any) => product.currency = 'USD');
      this.productOrg = productData?.products;
      this.products = productData?.products;
      this.onFilterChange('asc');
      this.store.dispatch(getProducts({ payload: { products: JSON.parse(JSON.stringify(this.products)) } }))
    }, (err) => {
      console.log('Error while fetching product Details')
    })
  }

  openProductDetail(productData: any) {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '700px',
      data: {
        productData: productData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onFilterChange(data: string) {
    if (data === "asc") {
      this.sortData('title', 'asc');
    } else if (data === "desc") {
      this.sortData('title', 'desc');
    } else if (data === "priceLow") {
      this.sortData('price', 'asc');
    } else if (data === "priceHigh") {
      this.sortData('price', 'desc');
    }
  }

  sortData(key: string, direction: string) {
    this.products.sort((a: any, b: any) => {
      (typeof (a[key]) === 'string') ? a[key] = a[key].toUpperCase() : '';
      (typeof (b[key]) === 'string') ? b[key] = b[key].toUpperCase() : '';
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    })
  }
  searchDataChange(searchString: string) {
    this.products = this.productOrg;
    this.products = this.products.filter((product: any) => {
      return product.title.toUpperCase().includes(searchString.toUpperCase())
    });
  }
}

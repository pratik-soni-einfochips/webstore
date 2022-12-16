import { ProductsService } from './../../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public categories = []
  constructor(private productsService: ProductsService, public route: Router) { }

  ngOnInit(): void {
    this.getCatrgories();
  }

  getCatrgories() {
    this.productsService.getCategories().subscribe((categoryData: any) => {
      this.categories = categoryData;
    })
  }

  categoryClick(categoryName:string) {
    this.route.navigate(
      ['/products'],
      { queryParams: { category: categoryName }}
    )
  }
}

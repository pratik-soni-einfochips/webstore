import { HeaderComponent } from './components/header/header.component';
import { StoreComponent } from './store.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductCurrencyPipe } from 'src/app/pipes/productCurrency.pipe';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    MatSnackBarModule
  ],
  exports:[],
  declarations: [StoreComponent,ProductsListComponent, HomeComponent, HeaderComponent,ProductCurrencyPipe]
})
export class AppStoreModule { }
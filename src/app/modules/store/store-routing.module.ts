import { HeaderComponent } from './components/header/header.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { StoreComponent } from './store.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Authguard } from 'src/app/services/authguard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[Authguard],
    component: StoreComponent, children: [
      {
        path: '',
        canActivate:[Authguard],
        component: HomeComponent,
      },
      {
        path: 'products',
        canActivate:[Authguard],
        component: ProductsListComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { webStoreState } from '../store/storeReducers';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: HttpClient, private store: Store<{
    webStore: webStoreState
  }>,) { }

  getProducts(){
    return this.http.get('https://dummyjson.com/products')
  }

  getCategories(){
    return this.http.get('https://dummyjson.com/products/categories')
  }
  getProductByCategory(categoryName:String){
    return this.http.get('https://dummyjson.com/products/category/'+categoryName)
  }
  isLoggedIn$():Observable<any>{
    // return this.store.pipe(select(webstore.userLoginStatus))
    return this.store.select(
      (state) => state.webStore.userLoginStatus
    );
  }
}

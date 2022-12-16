import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loggedIn } from 'src/app/store/storeActions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public store: Store) { }
  productsToCart: number = 0;
  ngOnInit(): void {
    this.store.subscribe((storeData: any) => {
      this.productsToCart = storeData.webStore.addedToCart.length;
    })
  }
  logout(): void {
    this.store.dispatch(loggedIn({ payload: { userLoginStatus: false } }));
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate {
  constructor(private productsService: ProductsService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot): Observable<any> {
    return this.productsService.isLoggedIn$().pipe(switchMap((data) => {
      if (data) {
        return of(data);
      } else {
        this.router.navigate(['']);
        return of(data);
      }
    }))
  }
}

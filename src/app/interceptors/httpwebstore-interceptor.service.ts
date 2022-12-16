import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HttpwebstoreInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
        return next.handle(
            req.clone({ headers: req.headers.set('demo', 'irobotPOC') })
        );
    }
}

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MyInterceptor implements HttpInterceptor {
	constructor(){}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const headers = new HttpHeaders({
			'token':  environment.token,
		});

		const request = req.clone({headers});
		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				if(err.status === 401){
					console.log("usuario no valido");
				}
				return throwError(err);
			})
		)
	}
}
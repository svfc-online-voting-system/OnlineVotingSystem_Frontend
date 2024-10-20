import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private router: Router) {}

	intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		const modifiedReq = req.clone({
			headers: req.headers.set('Content-Type', 'application/json'),
		});

		return next.handle(modifiedReq).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					// Redirect to login if unauthorized
					this.router.navigate(['/login']);
				}
				return throwError(error);
			}),
		);
	}
}

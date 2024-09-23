import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';

@Injectable()
export class AuthenticatedInterceptor implements HttpInterceptor {
	constructor(private router: Router, private authService: AuthService) {}
	// TODO: Implement the intercept method
	intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		throw new Error('Method not implemented.');
	}
}

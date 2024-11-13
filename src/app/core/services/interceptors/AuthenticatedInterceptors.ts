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

	intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		const adminPath = '/a/';
		const userPath = '/u/';

		const originUrl = req.url;

		if (originUrl.startsWith(adminPath) || originUrl.startsWith(userPath)) {
			if (!this.authService.isTokenValid()) {
				this.router.navigate(['/auth/login']);
				return new Observable<HttpEvent<unknown>>();
			}

			// TODO: Implement RBAC here
		}

		return next.handle(req);
	}
}

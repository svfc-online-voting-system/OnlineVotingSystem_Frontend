import { Injectable } from '@angular/core';
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import {
	ApiAuthResponse,
	type ApiAuthErrorResponse,
} from '@app/types/authResponseType';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> {
		const currentUrl = state.url;
		if (currentUrl.startsWith('/u')) {
			return this.authService.isTokenValid().pipe(
				map((res: ApiAuthResponse | ApiAuthErrorResponse) => {
					if ('error' in res) {
						console.log(
							`Authentication failed: ${res.error.message}`,
						);
						return false;
					}
					return res.code === 'success';
				}),
				tap((isValid: boolean) => {
					if (!isValid) {
						this.router.navigate(['/auth/login']);
					}
				}),
				catchError((error) => {
					console.error('An unexpected error occurred:', error);
					this.router.navigate(['/auth/login']);
					return of(false);
				}),
			);
		} else if (currentUrl.startsWith('/a')) {
			return this.authService.isTokenValid().pipe(
				map((res: ApiAuthResponse | ApiAuthErrorResponse) => {
					if ('error' in res) {
						console.log(
							`Authentication failed: ${res.error.message}`,
						);
						return false;
					}
					return res.code === 'success';
				}),
				tap((isValid: boolean) => {
					if (!isValid) {
						this.router.navigate(['/auth/login']);
					}
				}),
				catchError((error) => {
					console.error('An unexpected error occurred:', error);
					this.router.navigate(['/auth/login']);
					return of(false);
				}),
			);
		} else {
			return of(true);
		}
	}
}

import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@app/core/services/api/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import {
	ApiAuthResponse,
	type ApiAuthErrorResponse,
} from '@app/core/models/authResponseType';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	// Do a DI Pattern for AuthService, Router, and PLATFORM_ID
	private readonly _authService = inject(AuthService);
	private readonly _router = inject(Router);
	private readonly _platformId = inject(PLATFORM_ID);

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> {
		if (!isPlatformBrowser(this._platformId)) {
			return of(true);
		}

		const currentUrl = state.url;
		const isProtectedRoute =
			currentUrl.startsWith('/u') || currentUrl.startsWith('/a');

		if (isProtectedRoute) {
			return this._authService.isTokenValid().pipe(
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
						this._router.navigate(['/auth/login']);
					}
				}),
				catchError((error) => {
					console.error('An unexpected error occurred:', error);
					this._router.navigate(['/auth/login']);
					return of(false);
				}),
			);
		} else {
			return of(true);
		}
	}
}

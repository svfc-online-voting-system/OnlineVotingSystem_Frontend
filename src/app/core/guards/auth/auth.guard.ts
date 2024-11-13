import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanMatch,
	Route,
	UrlSegment,
} from '@angular/router';
import { AuthService } from '@app/core/services/api/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ApiAuthResponse } from '@app/core/models/authResponseType';
import { SnackbarService } from '@app/core/core.module';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanMatch {
	private readonly _authService = inject(AuthService);
	private readonly _router = inject(Router);
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _snackBarService = inject(SnackbarService);

	private checkAuth(url: string): Observable<boolean> {
		if (!isPlatformBrowser(this._platformId)) {
			return of(true);
		}

		const isProtectedRoute = url.startsWith('/u') || url.startsWith('/a');
		if (!isProtectedRoute) return of(true);

		return this._authService.isTokenValid().pipe(
			map((res: ApiAuthResponse) => {
				if ('error' in res) {
					return false;
				}
				const userRole = res.message;
				if (url.startsWith('/a') && userRole !== 'admin') {
					this._snackBarService.showSnackBar(
						'You do not have permission to access this page',
					);
					this._router.navigate(['/u/home']);
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
				if (error?.message) {
					this._snackBarService.showSnackBar(error.message);
				}
				console.error('An unexpected error occurred:', error);
				this._router.navigate(['/auth/login']);
				return of(false);
			}),
		);
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> {
		return this.checkAuth(state.url);
	}

	canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {
		const url = '/' + segments.map((s) => s.path).join('/');
		return this.checkAuth(url);
	}
}

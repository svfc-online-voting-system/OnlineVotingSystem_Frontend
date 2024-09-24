import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';
import type { ApiAuthResponse } from '@app/types/authResponseType';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	async canActivate(): Promise<boolean> {
		const res: ApiAuthResponse = await this.authService.isTokenValid();
		if (res.code === 'success' && res) {
			// TODO: Implement the RBAC logic here
			return true;
		}
		this.router.navigate(['/auth/login']);
		return false;
	}
}

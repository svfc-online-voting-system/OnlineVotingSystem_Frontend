import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';

export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): boolean {
		if (this.authService.isTokenValid()) {
			return true;
		}
		this.router.navigate(['/auth/login']);
		return false;
	}
}

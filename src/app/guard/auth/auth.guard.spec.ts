import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '@app/services/api/auth/auth.service';

describe('AuthGuard', () => {
	let guard: AuthGuard;
	let authService: jasmine.SpyObj<AuthService>;
	let router: jasmine.SpyObj<Router>;

	beforeEach(() => {
		const authServiceSpy = jasmine.createSpyObj('AuthService', [
			'isTokenValid',
		]);
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

		TestBed.configureTestingModule({
			providers: [
				AuthGuard,
				{ provide: AuthService, useValue: authServiceSpy },
				{ provide: Router, useValue: routerSpy },
			],
		});

		guard = TestBed.inject(AuthGuard);
		authService = TestBed.inject(
			AuthService
		) as jasmine.SpyObj<AuthService>;
		router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	it('should allow activation when token is valid', () => {
		authService.isTokenValid.and.returnValue(true);
		expect(guard.canActivate()).toBe(true);
		expect(router.navigate).not.toHaveBeenCalled();
	});

	it('should prevent activation and redirect to login when token is invalid', () => {
		authService.isTokenValid.and.returnValue(false);
		expect(guard.canActivate()).toBe(false);
		expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
	});
});

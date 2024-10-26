import { TestBed } from '@angular/core/testing';
import {
	Router,
	type ActivatedRouteSnapshot,
	type RouterStateSnapshot,
} from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '@app/core/services/api/auth/auth.service';
import {
	ApiAuthErrorResponse,
	ApiAuthResponse,
} from '@app/core/models/authResponseType';
import { of } from 'rxjs';

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
			AuthService,
		) as jasmine.SpyObj<AuthService>;
		router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	it('should allow activation when token is valid', (done) => {
		const response: ApiAuthResponse = {
			code: 'success',
			message: 'Token is valid',
		};
		authService.isTokenValid.and.returnValue(of(response));
		const route = {} as ActivatedRouteSnapshot;
		const state = { url: '/some-url' } as RouterStateSnapshot;

		guard.canActivate(route, state).subscribe((result) => {
			expect(result).toBe(true);
			expect(router.navigate).not.toHaveBeenCalled();
			done();
		});
	});

	it('should prevent activation and redirect to login when token is invalid', (done) => {
		const response: ApiAuthErrorResponse = {
			error: {
				code: 'invalid_token',
				message: 'Token is invalid',
			},
		};
		authService.isTokenValid.and.returnValue(of(response));
		const route = {} as ActivatedRouteSnapshot;
		const state = { url: '/some-url' } as RouterStateSnapshot;

		guard.canActivate(route, state).subscribe((result) => {
			expect(result).toBe(false);
			expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
			done();
		});
	});
});

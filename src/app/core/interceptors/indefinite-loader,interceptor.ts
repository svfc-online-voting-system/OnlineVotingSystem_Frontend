import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { IndefiniteLoaderService } from '@app/core/components/loader/indefinite-loader/indefinite-loader.service';

export const indefiniteLoaderInterceptor: HttpInterceptorFn = (req, next) => {
	let totalRequests = 0;
	const _indefiniteLoaderService = inject(IndefiniteLoaderService);

	totalRequests++;
	_indefiniteLoaderService.show();

	return next(req).pipe(
		finalize(() => {
			totalRequests--;
			if (totalRequests === 0) {
				_indefiniteLoaderService.hide();
			}
		}),
	);
};

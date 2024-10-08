import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VerifyEmailComponent } from './verify-email.component';
import { ActivatedRoute } from '@angular/router';

describe('VerifyEmailComponent', () => {
	let component: VerifyEmailComponent;
	let fixture: ComponentFixture<VerifyEmailComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [VerifyEmailComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: { paramMap: { get: () => 'mockId' } },
						params: of({ id: 'mockId' }),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(VerifyEmailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

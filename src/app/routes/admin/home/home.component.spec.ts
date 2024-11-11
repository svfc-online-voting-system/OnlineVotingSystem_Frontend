import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AdminHomeComponent } from '@app/routes/admin/home/home.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
	let component: AdminHomeComponent;
	let fixture: ComponentFixture<AdminHomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AdminHomeComponent],
			providers: [
				provideHttpClient(),
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: { paramMap: { get: () => 'mockId' } },
						params: of({ id: 'mockId' }),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AdminHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ManageAdminsComponent } from './manage-admins.component';
import { provideHttpClient } from '@angular/common/http';

describe('ManageAdminsComponent', () => {
	let component: ManageAdminsComponent;
	let fixture: ComponentFixture<ManageAdminsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ManageAdminsComponent],
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

		fixture = TestBed.createComponent(ManageAdminsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
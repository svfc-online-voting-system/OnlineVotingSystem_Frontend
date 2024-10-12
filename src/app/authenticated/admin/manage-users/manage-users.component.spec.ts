import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ManageUsersComponent } from './manage-users.component';

describe('ManageUsersComponent', () => {
	let component: ManageUsersComponent;
	let fixture: ComponentFixture<ManageUsersComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ManageUsersComponent],
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

		fixture = TestBed.createComponent(ManageUsersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

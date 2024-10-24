import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from '@app/routes/admin/home/home.component';

describe('HomeComponent', () => {
	let component: AdminHomeComponent;
	let fixture: ComponentFixture<AdminHomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AdminHomeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AdminHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

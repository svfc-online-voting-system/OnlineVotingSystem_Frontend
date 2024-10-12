import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ManageElectionsComponent } from './manage-elections.component';

describe('ManageElectionsComponent', () => {
	let component: ManageElectionsComponent;
	let fixture: ComponentFixture<ManageElectionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ManageElectionsComponent],
			providers: [
				{
					providers: [
						{
							provide: ActivatedRoute,
							useValue: {
								snapshot: { paramMap: { get: () => 'mockId' } },
								params: of({ id: 'mockId' }),
							},
						},
					],
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ManageElectionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

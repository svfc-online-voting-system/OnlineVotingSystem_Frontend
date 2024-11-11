import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagePollsComponent } from './manage-polls.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ManagePollsComponent', () => {
	let component: ManagePollsComponent;
	let fixture: ComponentFixture<ManagePollsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ManagePollsComponent],
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

		fixture = TestBed.createComponent(ManagePollsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

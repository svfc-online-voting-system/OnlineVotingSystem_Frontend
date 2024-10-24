import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ViewBallotComponent } from './view-ballot.component';

describe('ViewBallotComponent', () => {
	let component: ViewBallotComponent;
	let fixture: ComponentFixture<ViewBallotComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ViewBallotComponent],
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

		fixture = TestBed.createComponent(ViewBallotComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

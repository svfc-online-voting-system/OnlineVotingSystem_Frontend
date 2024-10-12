import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VotingStatusComponent } from './voting-status.component';

describe('VotingStatusComponent', () => {
	let component: VotingStatusComponent;
	let fixture: ComponentFixture<VotingStatusComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [VotingStatusComponent],
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

		fixture = TestBed.createComponent(VotingStatusComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
	let component: VoteComponent;
	let fixture: ComponentFixture<VoteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [VoteComponent],
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

		fixture = TestBed.createComponent(VoteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

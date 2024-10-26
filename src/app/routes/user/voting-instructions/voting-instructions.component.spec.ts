import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VotingInstructionsComponent } from './voting-instructions.component';
import { provideHttpClient } from '@angular/common/http';

describe('VotingInstructionsComponent', () => {
	let component: VotingInstructionsComponent;
	let fixture: ComponentFixture<VotingInstructionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [VotingInstructionsComponent],
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

		fixture = TestBed.createComponent(VotingInstructionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPollComponent } from './edit-poll.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditPollComponent', () => {
	let component: EditPollComponent;
	let fixture: ComponentFixture<EditPollComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EditPollComponent],
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

		fixture = TestBed.createComponent(EditPollComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

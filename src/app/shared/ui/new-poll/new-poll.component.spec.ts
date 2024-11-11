import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPollComponent } from './new-poll.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewPollComponent', () => {
	let component: NewPollComponent;
	let fixture: ComponentFixture<NewPollComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NewPollComponent, BrowserAnimationsModule],
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

		fixture = TestBed.createComponent(NewPollComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

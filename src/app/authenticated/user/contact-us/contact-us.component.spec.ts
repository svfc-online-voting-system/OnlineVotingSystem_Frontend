import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ContactUsComponent } from './contact-us.component';

describe('ContactUsComponent', () => {
	let component: ContactUsComponent;
	let fixture: ComponentFixture<ContactUsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ContactUsComponent],
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

		fixture = TestBed.createComponent(ContactUsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OtpComponent } from './otp.component';

describe('OtpComponent', () => {
	let component: OtpComponent;
	let fixture: ComponentFixture<OtpComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [OtpComponent, BrowserAnimationsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(OtpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

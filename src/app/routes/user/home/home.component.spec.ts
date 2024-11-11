import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserHomeComponent } from '@app/routes/user/home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserHomeComponent', () => {
	let component: UserHomeComponent;
	let fixture: ComponentFixture<UserHomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UserHomeComponent, BrowserAnimationsModule],
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

		fixture = TestBed.createComponent(UserHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

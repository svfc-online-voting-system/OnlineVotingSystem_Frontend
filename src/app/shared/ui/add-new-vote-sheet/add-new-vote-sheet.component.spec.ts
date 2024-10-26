import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AddNewVoteSheetComponent } from './add-new-vote-sheet.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

describe('AddNewVoteSheetComponent', () => {
	let component: AddNewVoteSheetComponent;
	let fixture: ComponentFixture<AddNewVoteSheetComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddNewVoteSheetComponent, MatBottomSheetRef],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							paramMap: {
								get: () => 'mockId',
							},
						},
						params: of({ id: 'mockId' }),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AddNewVoteSheetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

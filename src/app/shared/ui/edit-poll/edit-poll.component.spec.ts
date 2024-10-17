import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPollComponent } from './edit-poll.component';

describe('EditPollComponent', () => {
  let component: EditPollComponent;
  let fixture: ComponentFixture<EditPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

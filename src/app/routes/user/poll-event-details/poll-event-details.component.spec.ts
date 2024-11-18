import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollEventDetailsComponent } from './poll-event-details.component';

describe('PollEventDetailsComponent', () => {
  let component: PollEventDetailsComponent;
  let fixture: ComponentFixture<PollEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollEventDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

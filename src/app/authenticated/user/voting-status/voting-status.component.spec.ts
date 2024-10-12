import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingStatusComponent } from './voting-status.component';

describe('VotingStatusComponent', () => {
  let component: VotingStatusComponent;
  let fixture: ComponentFixture<VotingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

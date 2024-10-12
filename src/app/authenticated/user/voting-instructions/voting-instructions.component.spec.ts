import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingInstructionsComponent } from './voting-instructions.component';

describe('VotingInstructionsComponent', () => {
  let component: VotingInstructionsComponent;
  let fixture: ComponentFixture<VotingInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingInstructionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBallotComponent } from './view-ballot.component';

describe('ViewBallotComponent', () => {
  let component: ViewBallotComponent;
  let fixture: ComponentFixture<ViewBallotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBallotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

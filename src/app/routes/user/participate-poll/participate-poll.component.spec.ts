import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatePollComponent } from './participate-poll.component';

describe('ParticipatePollComponent', () => {
  let component: ParticipatePollComponent;
  let fixture: ComponentFixture<ParticipatePollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipatePollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipatePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

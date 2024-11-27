import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectoralEventDetailsComponent } from './electoral-event-details.component';

describe('ElectoralEventDetailsComponent', () => {
  let component: ElectoralEventDetailsComponent;
  let fixture: ComponentFixture<ElectoralEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectoralEventDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectoralEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

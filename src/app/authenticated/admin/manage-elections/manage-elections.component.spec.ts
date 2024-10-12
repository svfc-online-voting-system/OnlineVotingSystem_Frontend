import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageElectionsComponent } from './manage-elections.component';

describe('ManageElectionsComponent', () => {
  let component: ManageElectionsComponent;
  let fixture: ComponentFixture<ManageElectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageElectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

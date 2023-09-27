import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRequestComponent } from './select-request.component';

describe('SelectRequestComponent', () => {
  let component: SelectRequestComponent;
  let fixture: ComponentFixture<SelectRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

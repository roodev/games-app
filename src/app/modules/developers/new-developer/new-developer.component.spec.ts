import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeveloperComponent } from './new-developer.component';

describe('NewDeveloperComponent', () => {
  let component: NewDeveloperComponent;
  let fixture: ComponentFixture<NewDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

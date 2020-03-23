import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytvComponent } from './mytv.component';

describe('MytvComponent', () => {
  let component: MytvComponent;
  let fixture: ComponentFixture<MytvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

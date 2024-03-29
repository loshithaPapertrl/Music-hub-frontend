import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostComponent } from './all-post.component';

describe('TypographyComponent', () => {
  let component: AllPostComponent;
  let fixture: ComponentFixture<AllPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

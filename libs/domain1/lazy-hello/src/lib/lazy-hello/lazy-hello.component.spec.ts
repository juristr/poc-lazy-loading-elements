import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyHelloComponent } from './lazy-hello.component';

describe('LazyHelloComponent', () => {
  let component: LazyHelloComponent;
  let fixture: ComponentFixture<LazyHelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyHelloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

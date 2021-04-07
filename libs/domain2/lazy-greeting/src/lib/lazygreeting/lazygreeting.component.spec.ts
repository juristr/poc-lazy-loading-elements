import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazygreetingComponent } from './lazygreeting.component';

describe('LazygreetingComponent', () => {
  let component: LazygreetingComponent;
  let fixture: ComponentFixture<LazygreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazygreetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazygreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

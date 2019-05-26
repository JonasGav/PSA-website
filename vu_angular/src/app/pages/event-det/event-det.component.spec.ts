import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetComponent } from './event-det.component';

describe('EventDetComponent', () => {
  let component: EventDetComponent;
  let fixture: ComponentFixture<EventDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

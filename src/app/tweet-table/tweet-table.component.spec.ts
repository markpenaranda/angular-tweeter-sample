import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetTableComponent } from './tweet-table.component';

describe('TweetTableComponent', () => {
  let component: TweetTableComponent;
  let fixture: ComponentFixture<TweetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

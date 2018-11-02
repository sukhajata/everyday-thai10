import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPromptComponent } from './audio-prompt.component';

describe('AudioPromptComponent', () => {
  let component: AudioPromptComponent;
  let fixture: ComponentFixture<AudioPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

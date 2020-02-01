import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechComponentComponent } from './speech-component.component';

describe('SpeechComponentComponent', () => {
  let component: SpeechComponentComponent;
  let fixture: ComponentFixture<SpeechComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

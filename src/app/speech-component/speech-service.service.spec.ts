import { TestBed } from '@angular/core/testing';

import { SpeechServiceService } from './speech-service.service';

describe('SpeechServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechServiceService = TestBed.get(SpeechServiceService);
    expect(service).toBeTruthy();
  });
});

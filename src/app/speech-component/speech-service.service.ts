import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SpeechServiceService {
  private static recognition: SpeechRecognition;

  constructor() {}

  public getRecognition(): SpeechRecognition {
    if (SpeechServiceService.recognition) {
      return SpeechServiceService.recognition;
    }

    const recognition = new (window["SpeechRecognition"] ||
      window["webkitSpeechRecognition"] ||
      window["mozSpeechRecognition"] ||
      window["msSpeechRecognition"])() as SpeechRecognition;
    recognition.continuous = true;
    recognition.interimResults = true;

    return recognition;
  }
}

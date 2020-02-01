import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { SpeechServiceService } from "./speech-service.service";
import { Subscription, fromEvent, merge, Observable } from "rxjs";
import { filter, map, distinct } from "rxjs/operators";

@Component({
  selector: "app-speech-component",
  templateUrl: "./speech-component.component.html",
  styleUrls: ["./speech-component.component.css"]
})
export class SpeechComponentComponent implements OnInit, OnDestroy {
  @Input() playPause: EventEmitter<boolean>;
  @Output() onSpeechFound = new EventEmitter<string>();
  private subscriptions: Subscription[] = [];
  private recognition: SpeechRecognition;
  public isAutoRestarting: boolean = false;
  public isRecording: boolean = false;
  textData: string[] = [];

  constructor(private speechServiceService: SpeechServiceService) {}

  ngOnInit() {
    this.recognition = this.speechServiceService.getRecognition();
    const result$ = fromEvent(this.recognition, "result");
    const start$ = fromEvent(this.recognition, "start");
    const stop$ = fromEvent(this.recognition, "stop");
    const end$ = fromEvent(this.recognition, "end");

    const onStart = start$.subscribe(() => {
      // console.log('start')
      debugger;
      this.isRecording = true;

      setTimeout(() => {
        result$.subscribe(null, () => {
          if (this.isRecording) {
            this.isAutoRestarting = true;
            this.recognition.stop();
          }
        });
      }, 3000);
    });

    const onResult = result$
      .pipe(
        map((e: SpeechRecognitionEvent) => e.results[e.results.length - 1]),
        filter((result: SpeechRecognitionResult) => result.isFinal),
        map((result: SpeechRecognitionResult) => result[0].transcript),
        distinct()
      )

      .subscribe((text: any) => {
        this.textData.push(text);
        //  this.onSpeechFound.emit(text);
      });

    const onEnd = stop$.subscribe(() => {
      if (this.isAutoRestarting) {
        this.isAutoRestarting = false;
        this.recognition.start();
      } else {
        this.isRecording = false;
      }
    });

    this.subscriptions = this.subscriptions.concat([onStart, onEnd, onResult]);
  }

  ngOnDestroy() {
    this.recognition.stop();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  handleToggle() {
    if (!this.isRecording) {
      this.recognition.start();
    } else {
      debugger;
      this.recognition.stop();
    }
  }
}

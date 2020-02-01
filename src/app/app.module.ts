import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpeechComponentComponent } from "./speech-component/speech-component.component";
import { SpeechServiceService } from "./speech-component/speech-service.service";

@NgModule({
  declarations: [AppComponent, SpeechComponentComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [SpeechServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}

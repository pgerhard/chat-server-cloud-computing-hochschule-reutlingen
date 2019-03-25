import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ChatService } from "./chat.service";
import { ChatMessageComponent } from "./chat-message/chat-message.component";
import { ChatComponent } from "./chat/chat.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    ChatMessageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {}

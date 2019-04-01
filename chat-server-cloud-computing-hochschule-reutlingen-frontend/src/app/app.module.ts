import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ChatMessageComponent } from "./chat-message/chat-message.component";
import { ChatComponent } from "./chat/chat.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { RoomsComponent } from "./chat-list/rooms.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    ChatMessageComponent,
    UserDetailsComponent,
    RoomsComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: "LOCALSTORAGE", useFactory: getLocalStorage }],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getLocalStorage() {
  return typeof window !== "undefined" ? window.localStorage : null;
}

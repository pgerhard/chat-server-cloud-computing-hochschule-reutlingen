import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ChatComponent } from "./chat/chat.component";

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "chatroom", component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

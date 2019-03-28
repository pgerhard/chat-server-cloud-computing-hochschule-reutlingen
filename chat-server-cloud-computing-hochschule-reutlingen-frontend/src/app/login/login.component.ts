import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import {User} from "../user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  user: User;
  registered: User[]=[];

  constructor(private router:Router) {

  }

  ngOnInit() {}

  btnClick() {

    this.router.navigateByUrl('/chatroom');
  }



  loginUser(e){
   e.preventDefault();
   var username = e.target.elements[0].value;
   if (username.length<1 || username.length>10){
     console.log("Bitte gültige Eingabe")
   }
   else{
     this.user = new User();
     this.user.name=username;
     this.registered.push(this.user);
     this.registered.unshift(this.user);
     console.log(username);
     console.log(this.user.name);
     this.btnClick();

   }

}


}


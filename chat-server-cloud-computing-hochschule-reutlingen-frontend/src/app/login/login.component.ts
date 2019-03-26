import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private router:Router) {}

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
     console.log(username);
     this.btnClick();
   }

}


}


import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  checkLetter = false;
  checkCapital = false;
  checkNumber = false;
  checkLength = false;

  ngOnInit() {
    this.nameInput();
    this.passwordInput();
  }

  btnClick() {
    this.router.navigateByUrl("/chatroom");
  }

  loginUser(e) {
    e.preventDefault();


        console.log("!!!" + e.target.elements[0].value);
        console.log(e.target.elements[1].value);

        var username = e.target.elements[0].value;


          const user = new User();
          user.name = username;
          this.userService.login(user);

          this.btnClick();


  }


  checkValidPasword(){
    if(this.checkCapital && this.checkLength && this.checkLetter && this.checkNumber){
      console.log("!!! " + this.checkNumber + " " + this.checkLength )
      return true;
    }
    else{
      return false;
    }
  }

  nameInput(){
    var username = document.getElementById("nam");
    var nameinput = document.getElementById("nameinp");

    // When the user clicks on the name field, show the message box
    username.onfocus = function() {
      document.getElementById("nameinput").style.display = "block";
    }

    // When the user clicks outside of the name field, hide the message box
    username.onblur = function() {
      document.getElementById("nameinput").style.display = "none";
    }

    username.onkeyup=function () {
      var name_Let = /[a-zA-Z]/g;
      if(username.value.match(name_Let) && (username.value.length>2 && username.value.length<10)) {
        nameinput.classList.remove("invalid");
        nameinput.classList.add("valid");
        return true;
      } else {
        nameinput.classList.remove("valid");
        nameinput.classList.add("invalid");
      }
    }
  }

  passwordInput(){

    var myInput = document.getElementById("psw");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");


// When the user clicks on the password field, show the message box
    myInput.onfocus = function() {
      document.getElementById("message").style.display = "block";
    }

// When the user clicks outside of the password field, hide the message box
    myInput.onblur = function() {
      document.getElementById("message").style.display = "none";
    }

// When the user starts to type something inside the password field
    myInput.onkeyup = function() {
      //  lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if(myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
        this.checkLetter=true;
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }

      // capital letters
      var upperCaseLetters = /[A-Z]/g;
      if(myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        this.checkCapital = true;
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }

      // numbers
      var numbers = /[0-9]/g;
      if(myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
        this.checkNumber=true;
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }

      // length
      if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        this.checkLength = true;
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }

    }
    return this.checkValidPasword();
  }

}

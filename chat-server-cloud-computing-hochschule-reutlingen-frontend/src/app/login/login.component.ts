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

  fileToUpload: File = null;


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
        var passw = e.target.elements[1].value;

          const user = new User();
          user.name = username;
          user.password = passw;

          this.userService.login(user);

          this.btnClick();


  }


  nameInput(){
    var username = (document.getElementById("nam" ));
    var nameinput = document.getElementById("nameinp");

    // When the user clicks on the name field, show the nameinput box
    username.onfocus = function() {
      document.getElementById("nameinput").style.display = "block";
      document.getElementById("file").style.display = "block";

    }


    username.onkeyup=function () {
      var name_Let = /[a-zA-Z]/g;
      if((<HTMLInputElement>username).value.match(name_Let) && ((<HTMLInputElement>username).value.length>2 && (<HTMLInputElement>username).value.length<10)) {
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
      document.getElementById("nameinput").style.display = "none";
      document.getElementById("file").style.display = "none";
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
      if((<HTMLInputElement>myInput).value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");

      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }

      // capital letters
      var upperCaseLetters = /[A-Z]/g;
      if((<HTMLInputElement>myInput).value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");

      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }

      // numbers
      var numbers = /[0-9]/g;
      if((<HTMLInputElement>myInput).value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");

      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }

      // length
      if((<HTMLInputElement>myInput).value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");

      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }

    }

  }



  handleFileInput(files: any) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload) {
      console.log(`Uploaded file ${this.fileToUpload.name}, size ${this.fileToUpload.size}`);
    }
  }
}

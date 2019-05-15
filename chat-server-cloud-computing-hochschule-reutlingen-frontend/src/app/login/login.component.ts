import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user";
import { UserService } from "../user.service";
import { UploadService } from "../upload.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: UserService, private uploadService: UploadService) {}

  fileToUpload: File = null;




  ngOnInit() {

    this.nameInput(true,true,false,false,false,false);

  }

  btnClick() {
    this.router.navigateByUrl("/chatroom");
  }

  loginUser(e) {
    e.preventDefault();

    console.log("!!! [0]" + e.target.elements[0].value);
    console.log("[1].." + e.target.elements[1].value);
    console.log("[2].." + e.target.elements[2].value);

    var username = e.target.elements[0].value;
    var passw = e.target.elements[1].value;


    const user = new User();
    user.name = username;
    user.password = passw;

    this.userService.login(user);

    console.log("Test_username: " + this.userService.loggedInUser.name);
    

    this.btnClick();


    this.uploadService.uploadProfilePicture(username, this.fileToUpload);
    this.userService.login(user);

    console.log("Test_username: " + this.userService.loggedInUser.name);
    this.btnClick();
  }

  nameInput(booleanNam,booleanPass,boolLetter,boolCapital,bollNumber,bollLength){


    var username = (document.getElementById("nam" ));
    var nameinput = document.getElementById("nameinp");



    var myInput = document.getElementById("psw");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    var button = document.getElementById("butn");



    // When the user clicks on the name field, show the nameinput box

    username.onfocus = function () {


      if (!booleanPass) {
        document.getElementById("message").style.display = "block";
      }

      if(username.innerText.length>0) {
        console.log("111: " + booleanNam);
        if (!booleanNam) {

          document.getElementById("nameinput").style.display = "block";
          document.getElementById("file").style.display = "block";
          if (!booleanPass) {

            if(!bollLength || !boolLetter || !boolCapital || !bollNumber) {
              document.getElementById("message").style.display = "block";
            }
          }
        }
        else {
          if (!booleanPass) {
            if(!bollLength || !boolLetter || !boolCapital || !bollNumber) {
              document.getElementById("message").style.display = "block";
            }
          }
          document.getElementById("nameinput").style.display = "none";
          document.getElementById("file").style.display = "none";
        }

      }


    }


    username.onkeyup=function () {

      var name_Let = /[a-zA-Z]/g;
      if (
        (<HTMLInputElement>username).value.match(name_Let) &&
        ((<HTMLInputElement>username).value.length > 2 && (<HTMLInputElement>username).value.length < 10)
      ) {
        nameinput.classList.remove("invalid");
        nameinput.classList.add("valid");
        booleanNam = true;


      } else {
        booleanNam = false;

        nameinput.classList.remove("valid");
        nameinput.classList.add("invalid");
        console.log("Name Input: " + booleanNam);


      }



      if( booleanNam && boolLetter && boolCapital && bollNumber && bollLength){
        //document.getElementById("message").style.display = "none";
        //document.getElementById("nameinput").style.display = "none";
        //document.getElementById("file").style.display = "none";
        (<HTMLInputElement>document.getElementById("butn")).disabled = false;
      }else{
        (<HTMLInputElement>document.getElementById("butn")).disabled = true;
      }


    }


    // When the user clicks outside of the nameInput field, hide the message box
    username.onblur = function() {
      if(!booleanNam || username.innerText === ""){

        // booleanNam = true;
        console.log("Kommt rein in MSG Name: ")
        console.log("TestName: " + booleanNam);

        document.getElementById("nameinput").style.display = "block";
        document.getElementById("file").style.display = "block";

        if(!booleanPass && myInput.innerText.length>0){

          document.getElementById("message").style.display = "block";
        }
      }else{
        if(!booleanPass && myInput.innerText.length>0){

          document.getElementById("message").style.display = "block";
        }
        document.getElementById("nameinput").style.display = "none";
        document.getElementById("file").style.display = "none";
      }
    }
    //------------------------------------------------------------------------



// When the user clicks on the password field, show the message box

    myInput.onfocus = function () {

      if(myInput.innerText.length >0) {

        console.log("TestName: " + booleanNam);

        if (!booleanPass) {

          document.getElementById("message").style.display = "block";

          if (!booleanNam) {
            document.getElementById("nameinput").style.display = "block";
            document.getElementById("file").style.display = "block";
          }
          else {
            document.getElementById("nameinput").style.display = "none";
            document.getElementById("file").style.display = "none";
          }

        }

        else {
          document.getElementById("message").style.display = "none";
        }

      }

    }

// When the user clicks outside of the password field, hide the message box
    myInput.onblur = function() {
      if(!booleanPass || myInput.innerText === ""){

        if(!bollLength || !boolLetter || !boolCapital || !bollNumber) {
          document.getElementById("message").style.display = "block";
        }
      }
      else{
        document.getElementById("message").style.display = "none";
      }
    }




// When the user starts to type something inside the password field

    myInput.onkeyup = function() {

      //  lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if ((<HTMLInputElement>myInput).value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");

        boolLetter=true;


      } else {
        boolLetter=false;
        letter.classList.remove("valid");
        letter.classList.add("invalid");

        document.getElementById("message").style.display = "block";
        (<HTMLInputElement>document.getElementById("butn")).disabled = true;

        button.onmouseover = function(){
          document.getElementById("message").style.display = "block";
        }

      }

      // capital letters
      var upperCaseLetters = /[A-Z]/g;
      if ((<HTMLInputElement>myInput).value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");

        boolCapital = true;



      } else {
        boolCapital = false;
        capital.classList.remove("valid");
        capital.classList.add("invalid");
        // booleanPass = false;
        document.getElementById("message").style.display = "block";
        (<HTMLInputElement>document.getElementById("butn")).disabled = true;

        button.onmouseover = function(){
          document.getElementById("message").style.display = "block";
        }

      }

      // numbers
      var numbers = /[0-9]/g;
      if ((<HTMLInputElement>myInput).value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");

        bollNumber = true;


      } else {
        bollNumber = false;
        number.classList.remove("valid");
        number.classList.add("invalid");

        document.getElementById("message").style.display = "block";
        (<HTMLInputElement>document.getElementById("butn")).disabled = true;

        button.onmouseover = function(){

          document.getElementById("message").style.display = "block";
        }

      }

      // length
      if ((<HTMLInputElement>myInput).value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");


        bollLength = true;


      } else {
        bollLength = false;
        length.classList.remove("valid");
        length.classList.add("invalid");

        document.getElementById("message").style.display = "block";
        (<HTMLInputElement>document.getElementById("butn")).disabled = true;


        button.onmouseover = function(){

          document.getElementById("message").style.display = "block";

          if(username.innerText==="" || username.innerText.length < 3){
            document.getElementById("nameinput").style.display = "block";
            document.getElementById("file").style.display = "block";

          }
          else{
            document.getElementById("nameinput").style.display = "none";
            document.getElementById("file").style.display = "none";
          }
        }

      }


      if(booleanNam&&bollLength && boolLetter && boolCapital && bollNumber){
        document.getElementById("message").style.display = "none";
        document.getElementById("nameinput").style.display = "none";
        document.getElementById("file").style.display = "none";
        (<HTMLInputElement>document.getElementById("butn")).disabled = false;
      } else{
        if(!booleanPass){
          document.getElementById("message").style.display = "block";
        }
        (<HTMLInputElement>document.getElementById("butn")).disabled = true;
      }

      if(bollLength && bollNumber && boolCapital && boolLetter){
        booleanPass = true;
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

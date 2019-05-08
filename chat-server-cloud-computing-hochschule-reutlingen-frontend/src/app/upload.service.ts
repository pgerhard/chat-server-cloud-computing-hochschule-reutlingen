import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  private backendUrl: string = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  uploadProfilePicture(username: string, file: File) {
    const endpoint = `${this.backendUrl}/profile-picture`;

    this.encodeFile(file, base64String => {
      let body: any = {
        username: username,
        data: base64String
      };
      const httpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
      });
      this.httpClient.post(endpoint, body, { headers: httpHeaders }).subscribe(value => {
        console.log(value);
      });
    });
  }

  private encodeFile(file: File, callback: any) {
    const fileReader = new FileReader();
    fileReader.onload = function(readerEvent) {
      // @ts-ignore
      const binaryString = readerEvent.target.result;
      const base64String = btoa(binaryString);
      console.log(base64String);
      callback(base64String);
    };
    fileReader.readAsBinaryString(file);
  }
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ScreenGenerator';
  templates:any;
  event:any={};
  imgUrl:string="url(../assets";
  readonly ROOT_URL = 'https://localhost:44328/api';
  constructor(private http:HttpClient){
    this.http.get(this.ROOT_URL+"/events").subscribe(t=>{
      this.event=t;
      this.imgUrl+="/"+this.event.template.backgroundImageSrc+")";
    
  });
  }
}

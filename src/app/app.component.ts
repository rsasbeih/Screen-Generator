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
  i:number=0;
  length:number;
  readonly ROOT_URL = 'https://localhost:44328/api';
  constructor(private http:HttpClient){
    this.http.get<any[]>(this.ROOT_URL+"/events").subscribe(t=>{
      this.event=t[this.i];
      this.imgUrl="";
      this.imgUrl="url(../assets";
      this.imgUrl+="/"+this.event.template.backgroundImageSrc+")";
    
  });
   setInterval(() => this.getAllEventsForToday(http),3000);
  }
   getAllEventsForToday(http:HttpClient){

    this.http.get<any[]>(this.ROOT_URL+"/events").subscribe(t=>{
      this.length=t.length;
      console.log(this.length);
      this.event=t[this.i];
      if(this.i<this.length-1){
        this.i++;
      }
      else{
        this.i=0;
      }
      this.imgUrl="";
      this.imgUrl="url(../assets";
      this.imgUrl+="/"+this.event.template.backgroundImageSrc+")";
    
  });
  }
}

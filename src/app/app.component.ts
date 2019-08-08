import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ScreenGenerator';
  events:any;
  event:any={};
  imgUrl:string="url(../assets";
  i:number=0;
  length:number;
  defaultImgSrc:string;
  defaultTime:number;
  settings:any;
  readonly ROOT_URL = 'https://localhost:44328/api';
  constructor(private http:HttpClient,private http2:HttpClient){
      this.getAllEventsForToday(http);
      this.http.get<any[]>(this.ROOT_URL+"/events").subscribe(t=>{
      this.event=t[this.i];
      this.imgUrl="";
      this.imgUrl="url(../assets";
      this.imgUrl+="/"+this.event.template.backgroundImageSrc+")";
    
  });
  this.http2.get<any>(this.ROOT_URL+"/events/settings").subscribe(m=>{
    this.settings=m;
    console.log(this.settings);
    setInterval(() => this.getAllEventsForToday(http),this.settings.checkDbInterval);
  });
  // setInterval(() => this.getAllEventsForToday(http),60000);
   setInterval(()=> this.swap(),3000);
  }

   getAllEventsForToday(http:HttpClient){

    this.http.get<any[]>(this.ROOT_URL+"/events").subscribe(t=>{
      this.events=t;
      this.length=t.length;
      console.log(this.length);
      if(this.length==0){
        this.http.get<any>(this.ROOT_URL+"/events/settings").subscribe(m=>{
          this.settings=m;
          console.log(this.settings);
       //   setInterval(() => this.getAllEventsForToday(http),this.settings.defaultImage);
       this.imgUrl="";
       this.imgUrl="url(../assets";
       this.imgUrl+="/"+this.settings.defaultImage+")";
     
        });
      }
      
   //   setInterval(()=>this.swap(),3000)
     //  this.event=t[this.i];
      // if(this.i<this.length-1){
      //   this.i++;
      // }
      // else{
      //   this.i=0;
      // }
      // this.imgUrl="";
      // this.imgUrl="url(../assets";
      // this.imgUrl+="/"+this.event.template.backgroundImageSrc+")";
    
  });
  }
  swap(){
    this.event=this.events[this.i];
      if(this.i<this.length-1){
        this.i++;
      }
      else{
        this.i=0;
      }
      this.imgUrl="";
      this.imgUrl="url(../assets";
      this.imgUrl+="/"+this.event.template.backgroundImageSrc+")";
    
  }
}

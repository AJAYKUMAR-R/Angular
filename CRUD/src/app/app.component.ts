import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ModelService } from 'src/Service/api-service/model.service';
import {Student} from 'src/Model/Student';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { InteractionService } from './interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit,OnInit{
  title:string = 'CRUD';


  boolean:boolean = false;
  listOfStudents:Student[] = [];  
  Id?:number;
  count:number = 0;

  name:string = "000";

  // formGroup?: FormGroup;
  // input = new FormControl('');

  input:FormControl = new FormControl('AJay');

  ngOnInit(): void {
  
  }

 incr(){
  this.count = this.count + 1;
 }

 print(){
  this.inter.getMessage("Hello this is ajay from Service reardless of  relation communication");
  this.inter.getMessage("Hello this is ajay from Service reardless of  relation communication second");
 }

 names:string = "";

 logics(event:string){
  this.names = event;
 }

 alerts(event:string){
    if(event == "Ajay"){
      alert("Ajay");
    }
 }

 open(value:HTMLInputElement){
  
    value.focus
 }

 private num:number = 0;

 get numbers():number{
  return this.num
 }

 set numbers(number:number){
  this.num = number;
  if(number > 10){
    alert("you wrote a number which is greater than 10")
  }
}

setchildflag:boolean = false;

greetBind(name:string){
  alert("Welcome" + name)
}


@ViewChild('foc') textInput!:ElementRef;

//I can acces the data source of table components lie not only data source all methods
//and property vaiable in this parent components
@ViewChild(TableComponent,{static:true}) tableComponent!:TableComponent;

ngAfterViewInit(): void {
  this.textInput.nativeElement.focus();
  console.log(this.tableComponent.dataSource.data)
}



 constructor(private list:ModelService,private inter:InteractionService) {

  

//   list.getStudent().subscribe({
//     next:(response)=>{
//        this.listOfStudents = response;
//        console.log(response);
//     },
//     error:(error)=>{
//        console.log(error);
//     }  
//   });
//  }

//   Post():void{
//     this.list.postStudent({
//       name:"Steve Rogers",
//       age:45,
//       grade:58
//     }).subscribe({
//       next:(response)=>{
//         console.log(response);
//       },
//       error:(error)=>{
//         console.log(error);
//       }
//     })
//   }

//   Put(){
//      this.list.putStudent({
//       name:"Mark raffalo",
//       age:51,
//       grade:10
//     },11).subscribe({
//       next:(response)=>{  
//         console.log(response)
//       },
//       error:(error)=>{
//         console.log(error);
//       }
//     })
//   }

//   Delete(){
//     this.list.deleteStudent(12).subscribe({
//       next:(response)=>{
//         console.log(response)
//       },
//       error:(error)=>{
//         console.log(error.error);
//       }
//     })
//   }

}
  
 


pageTitle:string = "This is my page";

}

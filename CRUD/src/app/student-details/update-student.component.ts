import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModelService } from 'src/Service/api-service/model.service';
//For, group for grouping the form Control
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogComponent} from '../dialog-component/dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Validation } from 'src/utils/Validations/Validation';


@Component({
  selector: 'app-student-details',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class studentDetailsComponent implements OnInit,OnDestroy{


  pageHeading:string="";

  subscription : Subscription[] = [];

  response:string = "";

  studentId:number = 0;

  formtype?:boolean; 
  


  CreateForm!:FormGroup

  constructor(private list:ModelService,
    private ActivatedRoutes:ActivatedRoute,
    public dialog: MatDialog,
    ) {
   
  }
 

  //intialize the Form during the Page Life Cycle
  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      Name: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(6)]),
      Age: new FormControl('',[Validators.required,Validation.rangeValidation(1,18)]),
      Grade: new FormControl('',[Validators.required,Validation.gradeValidation(1,12)]),
    });

    
    //geting the Parameter Value
    this.ActivatedRoutes.paramMap.subscribe((data)=>{
      const value = data.get('id');
      if(value !== null){
        this.pageHeading = "Update Student";
        //parameter is there Flag value will be updated
        this.formtype = false;
        this.studentId = parseInt(value,10);
        const getStudent = this.list.getStudentByID(
          this.studentId
        ).subscribe((res)=>{
          //console.log(res);
        //rresponse has data it will work else redirects 
         if(res.data != null){
          this.CreateForm.patchValue({
            Name : res.data.studentName,
            Age : res.data.age,
            Grade : res.data.grade   
          })
         }else{
          const dialogStream = this.dialog.open(DialogComponent,{
            data:{
              isbutton:false,
              title:"Oops",
              description:res.responseMessage
            }
          });
          setTimeout(() => {
            document.location.href = "http://localhost:4200/table";
          },500); // Executes the arrow function after a 3-second delay
         }
        });
        this.subscription.push(getStudent);
      }else{
        this.formtype = true;
        this.pageHeading = "Create Student"
        this.studentId = 0;
      }
    })


    
  }

  submit(){
    if(this.formtype == true){
      this.createRecord();
    }else{
      this.updateRecord();
    }
  }

  updateRecord() {
    this.response = "";
    if(this.CreateForm.valid){
      const put = this.list.putStudent({
        studentName:this.Name?.value,
        age:this.Age?.value,
        grade:this.Grade?.value
      },this.studentId).subscribe({
        next:(response)=>{  
          window.location.href = "http://localhost:4200/table";
          this.CreateForm.reset();
        },
        error:(error)=>{
          this.response = "Internal Server Error";
        }
      })

      this.subscription.push(put);
    }else{
      this.response = "Please fill all the Required Fields";
    }
  }


  //Ajax call
  createRecord() {
    //Error reseting
    this.response = "";
    //checking Form Valid
    if(this.CreateForm.valid){
    const post = this.list.postStudent({
      studentName:(this.Name?.value),
        age:this.Age?.value,
        grade:this.Grade?.value
      }).subscribe({
        next:(response)=>{
          window.location.href = "http://localhost:4200/table";
         //Reseting the Form
         this.CreateForm.reset()
        },
        error:(error)=>{
          this.response = "Internal server Error contact Support";
        }
        
      })
      this.subscription.push(post);
    }else{
      this.response = "Please fill the required Field"
    }
  }

  //Getter Setters
  get Name(){
    return this.CreateForm.get("Name");
  }

  get Age(){
    return this.CreateForm.get("Age");
  }

  get Grade(){
    return this.CreateForm.get("Grade");
  }


  openDialog(): void {
    let dialogStream!: MatDialogRef<DialogComponent, any>;
    if(this.CreateForm.valid == true){
      if(this.formtype == true){
        dialogStream = this.dialog.open(DialogComponent,{
         data:{
           isbutton:true,
           title:"Create Record",
           description:"Do you want to Save this changes?"
         }
       });
     }else{
        dialogStream = this.dialog.open(DialogComponent,{
         data:{
           isbutton:true,
           title:"Update Record",
           description:"Are you want to update record?"
         }
       });
     };
     dialogStream.afterClosed().subscribe(result =>{
       const results = parseInt(result,10);
       if(results){
         this.submit();
       }
     })
    }else{
      this.response = "Details are not Filed properly look at the error message"
    }
  }


  ngOnDestroy(): void {
    //Unsubscribe all the Obervable
    if(this.subscription.length > 0){
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }

}



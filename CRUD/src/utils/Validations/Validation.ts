import { AbstractControl, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { ResponsesData } from "src/Model/ResponseData";
import { LoginService } from "src/Service/credential/login.service";

export class Validation{
 
  
  constructor() {
   
  }

    static rangeValidation(min: number, max: number) {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          if (value === null || value === undefined || value === '') {
            return { required: true };
          }
          const numericValue = parseFloat(value);
          if (numericValue < min || numericValue > max) {
            return { range: true };
          }
          return null; // No error, valid number in range
        };
      }
    
    
      static gradeValidation(min: number, max: number) {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          if (value === null || value === undefined || value === '') {
            return { required: true };
          }
          const numericValue = parseFloat(value);
          if (numericValue < min || numericValue > max) {
            return { grade: true };
          }
          return null; // No error, valid number in range
        };
      }


      static passwordPattern() {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          if (value === null || value === undefined || value === '') {
            return { required: true };
          }
          return null; // No error, valid number in range
        };
      }


      static confirmPasswordCheck(password: string, confirmPassword: string):boolean {
          if((password != undefined) && (confirmPassword != undefined)){
            let pass = password.replace(" ",""); 
            let confirmpass = confirmPassword.replace(" ",""); 
            if (pass === confirmpass) {
              return  true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        }
        
        
};


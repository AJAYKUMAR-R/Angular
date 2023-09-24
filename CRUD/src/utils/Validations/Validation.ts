import { AbstractControl, ValidationErrors } from "@angular/forms";

export class Validation{

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
}
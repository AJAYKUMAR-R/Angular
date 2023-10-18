import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  
export class GlobalErrorHandler implements ErrorHandler {
    /**
     *
     */
    constructor(private router:Router) {      
    }
  handleError(error: any): void {
    if (error && error.rejection) {
        const rejectionError = error.rejection.error;
        if (rejectionError && rejectionError.message === 'NG04002') {
         this.router.navigate(['notfound'])
        } else {
          // Handle other errors
          this.router.navigate(['notfound'])
          // Handle other errors as needed.
        }
      } else {
        // Handle errors with undefined status or other unexpected cases
        //this.router.navigate(['notfound'])
        // Handle these errors as needed.
        console.log(error);
        
      }
  
  }
}

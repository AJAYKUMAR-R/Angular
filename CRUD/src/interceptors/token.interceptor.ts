import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable ,of,switchMap,tap,throwError} from 'rxjs';
import { LoginService } from 'src/Service/credential/login.service';
import { Router } from '@angular/router';
import { ResponsesData } from 'src/Model/ResponseData';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cred:LoginService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.cred.getToken();
    if(myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`},
      })
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          //Handle unauthorized error here
          return this.handleUnAuthorizedError(request, next);
        }
        return throwError(() => error);
      })
    );
    
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    //Request one
    return this.cred.getRefreshTokenFromServer({
      RefreshTokens:"",
      JwtTokens:this.cred.getToken()!
    }).pipe(
      switchMap((res:ResponsesData)=>{
        //Request two
        return this.cred.renewToken({
          JwtTokens :this.cred.getToken()!,
          RefreshTokens : res.data
        })
        .pipe(
          switchMap((res:ResponsesData)=>{
            this.cred.storeRefreshToken(res.data.refreshTokens);
            this.cred.storeToken(res.data.jwtTokens);
            req = req.clone({
              setHeaders: {Authorization:`Bearer ${res.data.jwtTokens}`}  // "Bearer "+myToken
            })
            return next.handle(req);
          }),
          catchError((err)=>{
            return throwError(()=>{
              this.cred.signOut();
              this.router.navigate(['auth'])
            })
          })
        )
      })
    )


  }



}


// handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
//   let tokeApiModel = new UserTokens();
//   tokeApiModel.JwtTokens = this.cred.getToken()!;
//   tokeApiModel.RefreshTokens = this.cred.getRefreshToken()!;
//   return this.cred.renewToken(tokeApiModel).subscribe({
//     next:(res:ResponsesData)=>{
//       if(res.data != null){
//           this.cred.storeRefreshToken(res.data.RefreshTokens)
//           this.cred.storeToken(res.data.JwtTokens)
//           req = req.clone({
//           setHeaders: {Authorization:`Bearer ${res.data.JwtTokens}`}  // "Bearer "+myToken
//       })
//       return next.handle(req)
//       }
//     },
//     error:(res:HttpErrorResponse)=>{
//       if(res.status === 400)
//         this.router.navigate(['login'])
//         return next.handle(req)
//     }
// })
//   // .pipe(),
//   //   catchError((err:any)=>{
//   //       if(err.status === 400)
//   //         this.router.navigate(['login']);
//   //   })
// }

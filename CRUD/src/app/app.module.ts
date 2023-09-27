import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { studentDetailsComponent} from './student-details/update-student.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort,Sort, MatSortModule } from '@angular/material/sort';
import { TableComponent } from './table/table.component';
import { DashBoradComponent } from './dash-borad/dash-borad.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent} from './dialog-component/dialog-component.component';
import { ErrorComponent } from './error/error.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [
        AppComponent,
        studentDetailsComponent,
        TableComponent,
        DashBoradComponent,
        DialogComponent,
        ErrorComponent,
        LoginUserComponent,
        RegisterUserComponent,
      
    ],
    providers: [
        {
            provide:HTTP_INTERCEPTORS,
            useClass:TokenInterceptor,
            multi:true
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule, 
        MatInputModule, 
        MatSelectModule
          
        
    ]
})
export class AppModule { }

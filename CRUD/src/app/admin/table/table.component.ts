import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Student } from 'src/Model/Student';
import { ModelService } from 'src/Service/api-service/model.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog-component/dialog-component.component';
import { Router, RouterModule } from '@angular/router';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { ResponsesData } from 'src/Model/ResponseData';
import { PaginationService } from 'src/Service/api-service-pagination/pagination.service';
import { SearchParameters } from 'src/Model/SearchParameters';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatSortModule,MatTableModule, MatPaginatorModule,FormsModule,RouterModule,CommonModule ]
  //providers:[ModelService]
})

export class TableComponent  implements OnInit,OnDestroy{
  subscription :Subscription[]=[];
  dataSource = new MatTableDataSource<Student>();
  displayedColumns:string[] = ["Student_id","name","age","grade","update","delete"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  param:SearchParameters = new SearchParameters();
  rownumber:number = 1;

  //pagination on server side
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = 5;
  currentPage: number = 0; // Assuming 0-based indexing //5 51 51/5 10.3 //11
  totalItems: number = 0; // Replace with your actual total number of items

  searchParam:string = "";
  searchParamValue:string = "";
  dropdownValues:string[] = ['Student_id','Name','Age','Grade'];

  search(event:any){
  this.param.DropdownColumn = this.searchParamValue;
  this.param.DropdownColumnValue = event;
  this.paginator.pageIndex = 0;
  this.pageSize = 5;
  this.currentPage = 0;
  this.param.PageSize = this.pageSize;
  this.param.Page = this.currentPage;
  console.log(this.param);
  this.getRecordPerPage(this.param);
 }

  //for pagination 
  announceSortChange(sortState: Sort){
    this.param.SortDirection = sortState.direction.toString();
    this.param.SortColumn = sortState.active.toString();
    console.log(this.param);
    this.getRecordPerPage(this.param);
  }


  onPageChange(event: any): void {
    this.param.PageSize = event.pageSize;
    this.param.Page = event.pageIndex + 1;
    console.log(this.param);
    this.getRecordPerPage(this.param);
  }
  
  
  constructor(private list:ModelService,
    public dialog: MatDialog,
    public router:Router,
    private pagination:PaginationService) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //Seting the Default values
    this.param.DropdownColumn = "";
    this.param.DropdownColumnValue = "";
    this.param.Page = 0;
    this.param.PageSize = 5;
    this.param.SortColumn = "";
    this.param.SortDirection = "";
    this.getRecordPerPage(this.param);
  }

 
  //get records as per the page
  getRecordPerPage(parammeter:SearchParameters){
    this.pagination.getRecordPerPage(parammeter).subscribe({
      next:(response)=>{
        if(response.data != null){
          console.log( response.data.result);
          this.dataSource.data = response.data.result
          this.totalItems = response.data.totalCount;
          console.log(response.data.totalCount);
        }else{
          const pagination = this.dialog.open(DialogComponent,{
            data: {
              isbutton:false,
              title:"Error" + response.status,
              description:response.responseMessage
            }
          });
        }
      }
    })
  }
  
  


  DeleteRecord(id:number){
      const deleteStudents = this.list.deleteStudent(id).subscribe({
        next:(response)=>{
          //this.router.navigate(['table']);
          window.location.href = "http://localhost:4200/admin/grid";
        },
        error:(error)=>{
          alert("Internal Server Error")
        }
      })

      this.subscription.push(deleteStudents);
  }


  openDialog(id:number): void {
    DialogComponent
    const dialogStream = this.dialog.open(DialogComponent,{
      data: {
        isbutton:true,
        title:"Delete Record",
        description:"Do you want to delete?"
      }
    });
    dialogStream.afterClosed().subscribe(result =>{
      const results = parseInt(result,10);
      if(results){
        this.DeleteRecord(id);
      } 
    }
    )
  }


  ngOnDestroy(): void {
    //Unsubscribe all the Obervable
    if(this.subscription){
      this.subscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}

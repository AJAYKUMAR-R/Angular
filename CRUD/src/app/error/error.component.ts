import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  standalone:true,
  imports: [MatGridListModule,MatButtonModule,RouterModule]
})
export class ErrorComponent implements OnChanges,OnInit{
  /**
   *
   */
  constructor(private inter:InteractionService) {
       
  }
  ngOnInit(): void {
  let value = this.inter.$msgSource.subscribe({
    next:(msg)=>{
      alert(msg);
    }
  })
  }


  //I gonna access these two method here using id in parent components

  @Output() newEmitter:any = new EventEmitter();
  name:string = "Child Compone saying Hi"

  //get the value from the parent to child
  greet(){
    this.newEmitter.emit(this.name);
  }

  names:String = "Ajay";

  aletUser(){
    alert(`Welcome ${this.names}`)
  }

  ngOnChanges(changes: SimpleChanges): void {
    let flagValue = changes['flagValue'];
    if(flagValue.currentValue === true){
      this.flagValue = true;
    }else{
      this.flagValue = false;
    }
  }


  //this is the child component which really need to show an Element 
  //but it should be set from other components
  @Input() flagValue!:boolean;

  private value!:boolean;

  get GetValue():boolean{
    return this.value;
  }

  @Input()
  set GetValue(valued:boolean){
     this.value = valued;
  }


}

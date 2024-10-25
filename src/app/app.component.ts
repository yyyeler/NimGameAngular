import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterOutlet,
            CommonModule,
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
 
  protected title = 'Nim Game';
  protected rows : string[] = ['Row 1','Row 2','Row 3','Row 4'];
  protected progressValues : number[] = [1,3,5,7];
  protected selectedRow : number = -1;
  protected values: Map<number, boolean[]> = new Map([
    [0, [true]],
    [1, [true, true, true]],
    [2, [true, true, true, true, true]],
    [3, [true, true, true, true, true, true, true]]
  ]);
  protected isUser1 : boolean = true;  
  protected counter : number = 3;

  ngOnInit(): void {
    console.log("YYY");
  }

  protected makePassiveLastElement(i : number)
  {
    if(this.progressValues[i] > 0)
    {
      if(this.selectedRow === -1)
      {  
        this.selectedRow = i;
      }
  
      if(this.counter>0 && this.selectedRow === i)
      {
        this.counter--;
        let rowData = this.values.get(i);
        rowData![this.progressValues[i]-1] = false;
        this.progressValues[i]--;
        this.values.set(i,rowData!);
      }
  
      this.checkGameIsFinished();
    }
  }

  protected makeOpponentMove()
  {
    console.log("makeOpponentMove");
    this.counter = 3;
    this.isUser1 = !this.isUser1;
    this.selectedRow = -1;
  }

  private checkGameIsFinished()
  {
    let sum : number = 0;
    this.progressValues.forEach(x=> sum += x);

    if(sum === 0) alert("User "+((this.isUser1)?"2":"1") + " is won!!!");
  }

  protected newGame()
  {
    window.location.reload();  
  }

}

import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, Validators, FormGroup } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { TrainingService } from '../training.service';  
import { Training } from '../training';  
import { DatePipe } from '@angular/common';
import { debug } from 'util';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})

export class TrainingComponent implements OnInit {  
  dataSaved = false;  
  trainingForm: any;  
  allTrainings: Observable<Training[]>;  
  trainingIdUpdate = null;  
  massage = null;  
  isValidDate = null;
  
  constructor(private formbulider: FormBuilder, private trainingService:TrainingService) { }  
  
  ngOnInit() {  
    this.trainingForm = this.formbulider.group({  
      TrainingName: ['', [Validators.required]],  
      StartDate: ['', [Validators.required]],  
      EndDate: ['', [Validators.required]],
    }, {validator: this.dateValidator('StartDate', 'EndDate')});
    
    this.loadAllTrainings();  
  }  
  loadAllTrainings() {  
    this.allTrainings = this.trainingService.getAllTrainings();  
  }  
  onFormSubmit() {  
    this.dataSaved = false;  
    const training = this.trainingForm.value;
      this.CreateTraining(training); 
      this.trainingForm.reset();      
  }  
    
  CreateTraining(training: Training) {  
    if (this.trainingIdUpdate == null) {  
      this.trainingService.createTraining(training).subscribe(  
        () => {  
          this.dataSaved = true;  
          const sDate = new Date(training.StartDate);
          const eDate = new Date(training.EndDate);
          this.massage = 'New training has been schduled for '+ this.daysBetween(sDate,eDate) +' day(s)!';  
          this.loadAllTrainings();  
          this.trainingIdUpdate = null;  
          this.trainingForm.reset();  
        }  
      );  
    }   
  }   
  
dateValidator(from: string, to: string) {
  return (group: FormGroup) => {
    const sDate = new Date(group.controls[from].value);
    const eDate = new Date(group.controls[to].value);
    
    //debug(eDate +" "+ eDate.getDate() + " "+to.toString()+" "+ group.controls[to] +" "+  group.controls[to.toString()].value);
    if (!isNaN(sDate.valueOf())   &&  !isNaN(eDate.valueOf()) ) {
      if (sDate > eDate) {
           group.controls[to].setValue("");
           alert("End date should be grater than Start date ");
      }
    }
    return {};
  }
}
  resetForm() {  
    this.trainingForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }
  
  daysBetween( date1: Date, date2: Date ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;
  
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
  
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
      
    // Convert back to days and return
    return Math.round(difference_ms/one_day)+1; 
  }
}  

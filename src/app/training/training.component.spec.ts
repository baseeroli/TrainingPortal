import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { TrainingService } from '../training.service';
import { TrainingComponent } from './training.component';
import { Training } from '../training';
import {APP_BASE_HREF} from '@angular/common'; 
import { RouterModule } from '@angular/router';  

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
// create new instance of FormBuilder
const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        HttpClientTestingModule,
        RouterModule
      ],
      declarations: [ TrainingComponent ],
      
      providers: [ HttpClientModule, TrainingService, Training, FormBuilder , {provide: APP_BASE_HREF, useValue : '/' }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  // create reusable function for a dry spec.
  function updateForm(trainingName, startDate, endDate) {
    component.trainingForm.controls['TrainingName'].setValue(trainingName);
    component.trainingForm.controls['StartDate'].setValue(startDate);
    component.trainingForm.controls['EndDate'].setValue(endDate);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  it('form invalid when empty', () => {
    expect(component.trainingForm.valid).toBeFalsy();
  });

  it('training name field validity', () => {
    let name = component.trainingForm.controls['TrainingName'];
    expect(name.valid).toBeFalsy();

    name.setValue("");
    expect(name.hasError('required')).toBeTruthy();
 });

  it('start date field validity', () => {
    let startDate = component.trainingForm.controls['StartDate'];
    let endDate = component.trainingForm.controls['EndDate'];
    expect(startDate.valid).toBeFalsy();

    startDate.setValue("");
    expect(startDate.hasError('required')).toBeTruthy();

    startDate.setValue("04/10/2019");
    endDate.setValue("08/10/2019");
    //expect(startDate.hasError('invalidDate')).toBeTruthy();
    const result = component.dateValidator(startDate,endDate);
    expect(result).toBeTruthy();
  });

  it('end date field validity', () => {
    let startDate = component.trainingForm.controls['StartDate'];
    let endDate = component.trainingForm.controls['EndDate'];
    expect(endDate.valid).toBeFalsy();

    endDate.setValue("");
    expect(endDate.hasError('required')).toBeTruthy();

    startDate.setValue("04/10/2019");
    endDate.setValue("08/10/2019");
   // expect(endDate.hasError('invalidDate')).toBeTruthy();
    const result = component.dateValidator(startDate,endDate);
    expect(result).toBeTruthy();
  });

});

import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrainingService } from './training.service';
import {APP_BASE_HREF} from '@angular/common'; 
import { RouterModule } from '@angular/router'; 


describe('TrainingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
     
      HttpClientModule,
      HttpClientTestingModule,
      RouterModule
    ],
    
    providers: [ HttpClientModule, {provide: APP_BASE_HREF, useValue : '/' }],
  }));

  it('should be created', () => {
    const service: TrainingService = TestBed.get(TrainingService);
    expect(service).toBeTruthy();
  });
});

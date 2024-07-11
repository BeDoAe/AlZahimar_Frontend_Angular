import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoryDTOs } from '../../models/Story/story-dtos';
import { GeneralResponse } from '../../models/Story/general-response';
import { StoryTest } from '../../models/Story/story-test';
import { PatientStoryAnswersDTO } from '../../models/Story/patient-story-answers-dto';
import { HasStoryTest } from '../../models/Story/has-story-test';
import { TrueAssignStoryTest } from '../../models/Story/true-assign-story-test';
import { StoryInfoDto } from '../../models/Story/story-info-dto';
import { StoryFormFileDto } from '../../models/Story/story-form-file-dto';
import { StoryTestResponse } from '../../models/Story/story-test-response';
import { PatientStoryTest } from '../../models/Story/patient-story-test';
import { SubmitStoryTestResponse } from '../../models/Story/submit-story-test-response';


@Injectable({
  providedIn: 'root'
})
export class StoryServicesService {
 
    //  baseUrl:"http://localhost:2100/api"

  private apiUrl = `${environment.baseUrl}/Story`; // Adjust URL as needed

   // Initializing BehaviorSubject with an initial value of undefined
   private storyTestSubject = new BehaviorSubject<StoryDTOs | undefined>(undefined);

   // Exposing the BehaviorSubject as an observable
   storyTest$ = this.storyTestSubject.asObservable();
 
   // Method to update the current value of the story test
   setStoryTest(storyTest: StoryDTOs) {
    this.storyTestSubject.next(storyTest);
  }
 
   // Method to get the current value of the story test
  //  getStoryTestSubject(): Observable<StoryDTOs | undefined> {
  //   return this.storyTestSubject.asObservable();
  // }
  
  getStoryTestSubject(): Observable<StoryDTOs | undefined> {
    return this.storyTest$; // Since storyTest$ is already an Observable, return it directly
  }


  constructor(private http: HttpClient) { }

  getAllStoryTests(): Observable<GeneralResponse<StoryInfoDto[]>> {
    return this.http.get<GeneralResponse<StoryInfoDto[]>>(`${this.apiUrl}/AllStorytest`);
  }
 

  getStoryTestsOfPatient(): Observable<GeneralResponse<StoryDTOs[]>> {
    return this.http.get<GeneralResponse<StoryDTOs[]>>(`${this.apiUrl}`);
  }

  getStoryTest(storytestId: number): Observable<GeneralResponse<StoryDTOs>> {
    return this.http.get<GeneralResponse<StoryDTOs>>(`${this.apiUrl}/Storytest/${storytestId}`);
  }

  //Admin
  addStoryTest(storyFormFileDto: StoryFormFileDto): Observable<GeneralResponse<StoryTest>> {
    return this.http.post<GeneralResponse<StoryTest>>(`${this.apiUrl}/AddStoryTest`, storyFormFileDto);
  }
  //Admin
  updateStoryTest(storyTestId: number, storyFormFileDto: StoryFormFileDto): Observable<GeneralResponse<StoryTestResponse>> {
    return this.http.put<GeneralResponse<StoryTestResponse>>(`${this.apiUrl}/UpdateStoryTest/${storyTestId}`, storyFormFileDto);
  }
  //Admin
  deleteStoryTest(storyTestId: number): Observable<GeneralResponse<StoryTestResponse>> {
    return this.http.delete<GeneralResponse<StoryTestResponse>>(`${this.apiUrl}/DeleteStoryTest/${storyTestId}`);
  }

  // submitStoryTest(storyTestId: number, patientStoryAnswers: PatientStoryAnswersDTO[]): Observable<GeneralResponse<SubmitStoryTestResponse>> {
  //   return this.http.post<GeneralResponse<SubmitStoryTestResponse>>(`${this.apiUrl}/submitStoryTest`, { storyTestId, patientStoryAnswers });
  // }
  submitStoryTest(storyTestId: number, patientStoryAnswers: PatientStoryAnswersDTO[]): Observable<GeneralResponse<SubmitStoryTestResponse>> {
    const params = new HttpParams().set('storytestId', storyTestId.toString());
    return this.http.post<GeneralResponse<SubmitStoryTestResponse>>(`${this.apiUrl}/submitStoryTest`, patientStoryAnswers, { params });
  }
  hasStoryTest(storyTestId: number): Observable<GeneralResponse<boolean>> {
    return this.http.post<GeneralResponse<boolean>>(
      `${this.apiUrl}/HasStoryTest?storytestId=${storyTestId}`, null
    );
  }
  assignPatientStoryTest(hasStoryTest: boolean, storyTestId: number): Observable<GeneralResponse<number | StoryDTOs>> {
    // Construct query parameters
    let params = new HttpParams()
      .set('hasStoryTest', hasStoryTest.toString())
      .set('storytestId', storyTestId.toString());

    return this.http.post<GeneralResponse<number | StoryDTOs>>(
      `${this.apiUrl}/AssignPatientStoryTest`,
      null,
      { params }
    );
  }
  // assignPatientStoryTest(hasStoryTest: boolean, storyTestId: number): Observable<GeneralResponse<number | StoryDTOs>> {
  //   return this.http.post<GeneralResponse<number | StoryDTOs>>(
  //     `${this.apiUrl}/AssignPatientStoryTest`, 
  //     { hasStoryTest, storytestId: storyTestId }
  //   );
  // }
  // callAssignPatientStoryTestWithStaticValues(): Observable<GeneralResponse<number | StoryDTOs>> {
  //   const hasStoryTest = false; // Static value
  //   const storyTestId = 1; // Static value

  //   const payload = { hasStoryTest, storyTestId };
  //   console.log('Static AssignPatientStoryTest payload:', payload);

  //   return this.http.post<GeneralResponse<number | StoryDTOs>>(
  //     `${this.apiUrl}/AssignPatientStoryTest`, 
  //     payload
  //   );
  // }

}

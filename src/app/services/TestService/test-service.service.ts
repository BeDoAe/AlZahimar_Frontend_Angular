import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GeneralResponse } from '../../models/Story/general-response';
import { TestDTO } from '../../models/Test/test-dto';
import { TestInfoDto } from '../../models/Test/test-info-dto';
import { AddTestDTO } from '../../models/Test/add-test-dto';
import { PatientAnswerDTO } from '../../models/Test/patient-answer-dto';
import { PatientTest } from '../../models/Test/patient-test';
import { TestReviewDTO } from '../../models/Test/test-review-dto';
import { SubmitTestResponse } from '../../models/Test/submit-test-response';
import { ResultOfTestDTO } from '../../models/Test/result-of-test-dto';




@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
 
  private apiUrl = `${environment.baseUrl}/Test`; // Adjust URL as needed


  // private resultSource = new BehaviorSubject<ResultOfTestDTO | null>(null);
  // currentResult = this.resultSource.asObservable();

  // setResult(result: ResultOfTestDTO) {
  //   console.log('Setting result:', result); // Added log
  //   this.resultSource.next(result);

  // }
    // BehaviorSubject to hold the current result
    private resultSource = new BehaviorSubject<ResultOfTestDTO | null>(null);
    currentResult = this.resultSource.asObservable();
  
  
    // Method to update the current result
    setResult(result: ResultOfTestDTO) {
      console.log('Setting result:', result);
      this.resultSource.next(result);
    }
  
    // Method to get the current result as an observable
    getResult(): Observable<ResultOfTestDTO | null> {
      return this.currentResult;
    }
   // Initializing BehaviorSubject with an initial value of undefined
   private TestSubject = new BehaviorSubject<TestDTO | undefined>(undefined);

   // Exposing the BehaviorSubject as an observable
   Test$ = this.TestSubject.asObservable();
 
   // Method to update the current value of the story test
   setSubjectTest(Test: TestDTO) {
    console.log('Setting Test:', Test); // Added log
    this.TestSubject.next(Test);
  }
 
   // Method to get the current value of the story test
  //  getStoryTestSubject(): Observable<StoryDTOs | undefined> {
  //   return this.storyTestSubject.asObservable();
  // }
  
  getTestSubject(): Observable<TestDTO | undefined> {
    return this.Test$; // Since storyTest$ is already an Observable, return it directly
  }


  constructor(private http: HttpClient) { }

   // API Methods
 
   getAllTests(): Observable<GeneralResponse<TestInfoDto[]>> {
    return this.http.get<GeneralResponse<TestInfoDto[]>>(`${this.apiUrl}/AllTest`);
  }

  getTestsOfPatient(): Observable<GeneralResponse<TestDTO[]>> {
    return this.http.get<GeneralResponse<TestDTO[]>>(this.apiUrl);
  }

  // getTest(testId: number): Observable<GeneralResponse<TestDTO>> {
  //   return this.http.get<GeneralResponse<TestDTO>>(`${this.apiUrl}/test/${testId}`);
  // }

   // Add the method to get the test by ID
   getTestById(testId: number): Observable<GeneralResponse<TestDTO>> {
    return this.http.get<GeneralResponse<TestDTO>>(`${this.apiUrl}/test/${testId}`);
  }
//Admin
  addTest(testDTO: AddTestDTO): Observable<GeneralResponse<TestDTO>> {
    return this.http.post<GeneralResponse<TestDTO>>(this.apiUrl, testDTO);
  }
//Admin
updateTest(testId: number, testDTO: AddTestDTO): Observable<GeneralResponse<string>> {
  return this.http.put<GeneralResponse<string>>(`${this.apiUrl}?testId=${testId}`, testDTO);
}

  
//Admin
  deleteTest(testId: number): Observable<GeneralResponse<string>> {
    return this.http.delete<GeneralResponse<string>>(`${this.apiUrl}/${testId}`);
  }

  //     submitTest(testId: number, patientAnswers: PatientAnswerDTO[]): Observable<GeneralResponse<PatientTest>> {
  //   return this.http.post<GeneralResponse<PatientTest>>(`${this.apiUrl}/submitTest?testId=${testId}`, patientAnswers);
  // }

  submitTestscore(testId: number, patientAnswers: PatientAnswerDTO[]): Observable<GeneralResponse<SubmitTestResponse>> {
    const params = new HttpParams().set('testId', testId.toString()); // Ensure correct parameter name
    return this.http.post<GeneralResponse<SubmitTestResponse>>(`${this.apiUrl}/SubmitTest_Score`, patientAnswers, { params });
  }
  

  reviewTest(): Observable<GeneralResponse<TestReviewDTO[]>> {
    return this.http.get<GeneralResponse<TestReviewDTO[]>>(`${this.apiUrl}/ReviewTest`);
  }
 
  hasTest(testId: number): Observable<GeneralResponse<boolean>> {
    return this.http.post<GeneralResponse<boolean>>(
      `${this.apiUrl}/HasTest?TestId=${testId}`, null
    );
  }

  assignTest(hasTest: boolean, TestId: number): Observable<GeneralResponse<TestDTO | number>> {
    console.log(`Assigning test with ID ${TestId}, hasTest: ${hasTest}`);
    const params = { hasTest: hasTest.toString(), TestId: TestId.toString() };
    return this.http.post<GeneralResponse<TestDTO | number>>(`${this.apiUrl}/AssignPatientTest`, null, { params });
  }


  //Submit 
  submitTest(testId: number, patientAnswers: PatientAnswerDTO[]): Observable<GeneralResponse<ResultOfTestDTO>> {
    const params = new HttpParams().set('testId', testId.toString());
    return this.http.post<GeneralResponse<ResultOfTestDTO>>(`${this.apiUrl}/submitTest`, patientAnswers, { params });
  }
}
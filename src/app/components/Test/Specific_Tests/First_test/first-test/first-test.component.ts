import { Component, OnInit } from '@angular/core';
import { TestDTO } from '../../../../../models/Test/test-dto';
import { TestServiceService } from '../../../../../services/TestService/test-service.service';
import { TestAnswerQuestionDTO } from '../../../../../models/Test/test-answer-question-dto';
import { Router } from '@angular/router';
import { PatientAnswerDTO } from '../../../../../models/Test/patient-answer-dto';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedModule } from '../../../../../models/shared-module';

@Component({
  selector: 'app-first-test',
  standalone: true,
  imports: [CommonModule, FormsModule,SharedModule],
  templateUrl: './first-test.component.html',
  styleUrl: './first-test.component.css'
})
export class FirstTestComponent implements OnInit {

  test: TestDTO | undefined;
  TestQuestionAndAnswersOBJ?: TestAnswerQuestionDTO[];
  selectedOptions: { [index: number]: string } = {};
  score?: number;

  constructor(private testService: TestServiceService ,  private router: Router  ) { }

  ngOnInit(): void {
    this.getTestById(3);
  }

  getTestById(testId: number): void {
    this.testService.getTestById(testId).subscribe(response => {
      if (response.isSuccess) {
        this.test = response.data;
        this.TestQuestionAndAnswersOBJ = this.test.testAnswerQuestions;
        console.log("Test :",this.test);
        console.log("TestQuestionAndAnswersOBJ :",this.TestQuestionAndAnswersOBJ);
        this.testService.setSubjectTest(this.test); // Store the test in the BehaviorSubject
      } else {
        console.error('Failed to fetch the test:', response.data);
      }
    }, error => {
      console.error('Error fetching the test:', error);
    });
  }

  selectOption(index: number, option: string): void {
    this.selectedOptions[index] = option;
  }

  submitAnswers(): void {
    if (this.test && this.TestQuestionAndAnswersOBJ) {
      const answers: PatientAnswerDTO[] = this.TestQuestionAndAnswersOBJ.map((question, index) => ({
        QuestionId: question.id,
        Answer: this.selectedOptions[index] || ''
      }));

      const testId = this.test.testId;

      this.testService.submitTest(testId, answers).subscribe(response => {
        if (response.isSuccess) {
          // Save the result in ResultService
          this.testService.setResult(response.data);
          console.log("score",response.data);
          this.router.navigate(['/SpecificTestResultComponent']);
        } else {
          console.error('Failed to submit story test - isSuccess is false');
        }
      }, error => {
        console.error('Error submitting story test:', error);
      });
    }
  }
}


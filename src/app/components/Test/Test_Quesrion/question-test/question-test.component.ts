import { Component, OnInit ,NgModule} from '@angular/core';
import { TestDTO } from '../../../../models/Test/test-dto';
import { TestAnswerQuestionDTO } from '../../../../models/Test/test-answer-question-dto';
import { TestServiceService } from '../../../../services/TestService/test-service.service';
import { Router } from '@angular/router';
import { PatientAnswerDTO } from '../../../../models/Test/patient-answer-dto';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../models/shared-module';


@Component({
  selector: 'app-question-test',
  standalone: true,
  imports: [CommonModule, FormsModule,SharedModule],
  templateUrl: './question-test.component.html',
  styleUrl: './question-test.component.css'
})

export class QuestionTestComponent implements OnInit {
  TestDetails: TestDTO | undefined;
  TestQuestionAndAnswersOBJ?: TestAnswerQuestionDTO[];
  selectedOptions: { [index: number]: string } = {};
  score?: number;

  constructor(
    private testService: TestServiceService,
    // private resultService: ResultService, // Inject ResultService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testService.getTestSubject().subscribe(
      (test: TestDTO | undefined) => {
        if (test) {
          this.TestDetails = test;
          this.TestQuestionAndAnswersOBJ = test.testAnswerQuestions;
        } else {
          console.error('No story test data found.');
        }
      },
      (error) => {
        console.error('Error fetching story test data:', error);
      }
    );
  }

  selectOption(index: number, option: string): void {
    this.selectedOptions[index] = option;
  }

  submitAnswers(): void {
    if (this.TestDetails && this.TestQuestionAndAnswersOBJ) {
      const answers: PatientAnswerDTO[] = this.TestQuestionAndAnswersOBJ.map((question, index) => ({
        QuestionId: question.id,
        Answer: this.selectedOptions[index] || ''
      }));

      const testId = this.TestDetails.testId;

      this.testService.submitTest(testId, answers).subscribe(response => {
        if (response.isSuccess) {
          // Save the result in ResultService
          this.testService.setResult(response.data);
          console.log("score",response.data);
          this.router.navigate(['/ResultsTest']);
        } else {
          console.error('Failed to submit story test - isSuccess is false');
        }
      }, error => {
        console.error('Error submitting story test:', error);
      });
    }
  }
}


// implements OnInit {
//   TestDetails: TestDTO | undefined;
//   TestQuestionAndAnswersOBJ?: TestAnswerQuestionDTO[];
//   selectedOptions: { [index: number]: string } = {};
//   score?: number;

//   constructor(private testService: TestServiceService, private router: Router) {}

//   ngOnInit(): void {
//     this.testService.getTestSubject().subscribe(
//       (test: TestDTO | undefined) => {
//         if (test) {
//           this.TestDetails = test;
//           console.log("In Question component", test.testAnswerQuestions);
//           console.log("In Question component", this.TestDetails.testAnswerQuestions);

//           this.TestQuestionAndAnswersOBJ = test.testAnswerQuestions;
//           console.log('Question and Answers:', this.TestQuestionAndAnswersOBJ);
//           console.log('Test Details:', this.TestDetails);
//         } else {
//           console.error('No story test data found.');
//         }
//       },
//       (error) => {
//         console.error('Error fetching story test data:', error);
//       }
//     );
//   }

//   selectOption(index: number, option: string): void {
//     this.selectedOptions[index] = option;
//     console.log(`Selected option for question index ${index}: ${option}`);
//   }

//   submitAnswers(): void {
//     console.log('Submitting answers...');
//     if (this.TestDetails && this.TestQuestionAndAnswersOBJ) {
//       const answers: PatientAnswerDTO[] = this.TestQuestionAndAnswersOBJ.map((question, index) => ({
//         QuestionId: question.id,
//         Answer: this.selectedOptions[index] || ''
//       }));

//       const testId = this.TestDetails.testId;

//       this.testService.submitTestscore(testId, answers).subscribe(response => {
//         console.log('Submit response:', response);

//         if (response.isSuccess) {
//           console.log('Response data:', response.data);

//           if (response.data && response.data.score !== undefined) {
//             this.score = response.data.score;
//             console.log('Assigned test score:', this.score);

//             this.router.navigate(['/results-test'], { queryParams: { score: this.score } });
//           } else {
//             console.error('Score not found in response data');
//           }
//         } else {
//           console.error('Failed to submit story test - isSuccess is false');
//         }
//       }, error => {
//         console.error('Error submitting story test:', error);
//       });
//     }
//   }

//   navigateToResults(score: number): void {
//     console.log('Navigating to results with score:', score);
//     setTimeout(() => {
//       this.router.navigate(['/results-test'], { queryParams: { score } });
//       console.log('Navigation executed');
//     }, 1000); // Example delay of 1000 milliseconds (1 second), adjust as needed
//   }
// }


/////////////////////////////////////


// implements OnInit {
//   TestDetails: TestDTO | undefined;
//   TestQuestionAndAnswersOBJ?: TestAnswerQuestionDTO[] ;
//   selectedOptions: { [index: number]: string } = {};
//   score?:number ;

//   constructor(private testService: TestServiceService, private router: Router) {}

//   ngOnInit(): void {
//     this.testService.getTestSubject().subscribe(
//       (test: TestDTO | undefined) => {
//         if (test) {
//           this.TestDetails = test;
//           console.log("In Question component", test.testAnswerQuestions);
//           console.log("In Question component", this.TestDetails.testAnswerQuestions)


//           this.TestQuestionAndAnswersOBJ = test.testAnswerQuestions;
//           console.log('Question and Answers:', this.TestQuestionAndAnswersOBJ);
//           console.log('Test Details:', this.TestDetails);
//         } else {
//           console.error('No story test data found.');
//         }
//       },
//       (error) => {
//         console.error('Error fetching story test data:', error);
//       }
//     );
//   }
  



//   selectOption(index: number, option: string): void {
//     this.selectedOptions[index] = option;
//     console.log(`Selected option for question index ${index}: ${option}`);
//   }
//   submitAnswers(): void {
//     console.log('Submitting answers...');
//     if (this.TestDetails && this.TestQuestionAndAnswersOBJ) {
//       const answers: PatientAnswerDTO[] = this.TestQuestionAndAnswersOBJ.map((question, index) => ({
//         QuestionId: question.id, // Ensure this matches the property name in your DTO
//         Answer: this.selectedOptions[index] || ''
//       }));
  
//       const testId = this.TestDetails.testId; // Ensure correct casing
  
//       this.testService.submitTest(testId, answers).subscribe(response => {
//         console.log('Submit response:', response);
//         if (response.isSuccess) {
//           // this.navigateToResults(response.data.data.Score); // Pass score to navigateToResults method
//           this.score = response.data.data.Score;
//           console.log('Assigned test score:', response.data.data.Score);
//           console.log('Assigned test score:', this.score);


//           this.router.navigate(['/results-test'], { queryParams: { score: response.data.data.Score } });
//         } else {
//           console.error('Failed to submit story test');
//         }
//       }, error => {
//         console.error('Error submitting story test:', error);
//       });
//     }
//   }
  
//   // submitAnswers(): void {
//   //   console.log('Submitting answers...');
//   //   if (this.TestDetails && this.TestQuestionAndAnswersOBJ) {
//   //     const answers: PatientAnswerDTO[] = this.TestQuestionAndAnswersOBJ.map((question, index) => ({
//   //       QuestionId: question.id,
//   //       Answer: this.selectedOptions[index] || ''
//   //     }));

//   //     const storyTestId = this.TestDetails.testId;

//   //     this.testService.submitTest(storyTestId, answers).subscribe(response => {
//   //       console.log('Submit response:', response);
//   //       if (response.isSuccess) {
//   //         this.navigateToResults(response.data.data.Score); // Pass score to navigateToResults method
//   //       } else {
//   //         console.error('Failed to submit story test');
//   //       }
//   //     }, error => {
//   //       console.error('Error submitting story test:', error);
//   //     });
//   //   }
//   // }

//   navigateToResults(score: number): void {
//     console.log('Navigating to results with score:', score);
//     setTimeout(() => {
//       this.router.navigate(['/results-test'], { queryParams: { score } });
//       console.log('Navigation executed');
//     }, 1000); // Example delay of 1000 milliseconds (1 second), adjust as needed
//   }
// }
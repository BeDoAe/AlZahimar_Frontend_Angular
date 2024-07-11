import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SelectedOptionStoryTestDirective } from '../../../directives/selected-option-story-test.directive';
import { StoryDTOs } from '../../../models/Story/story-dtos';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryServicesService } from '../../../services/StoryService/story-services.service';
import { GeneralResponse } from '../../../models/Story/general-response';
import { PatientStoryAnswersDTO } from '../../../models/Story/patient-story-answers-dto';
import { SubmitStoryTestResponse } from '../../../models/Story/submit-story-test-response';
import { PatientStoryTest } from '../../../models/Story/patient-story-test';
import { SharedModule } from '../../../models/shared-module';
import { StoryTestAnswersQuestionsDTO } from '../../../models/Story/story-test-answers-questions-dto';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule,SharedModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})

 export class QuestionsComponent  implements OnInit {
  storyTestDetails: StoryDTOs | undefined;
  storyQuestionAndAnswersOBJ: StoryTestAnswersQuestionsDTO[] | undefined;
  selectedOptions: { [index: number]: string } = {};
  Pic_Sound_URl: string = "http://localhost:2100";

  constructor(private storyService: StoryServicesService, private router: Router) {}

  ngOnInit(): void {
    this.storyService.getStoryTestSubject().subscribe(
      (storyTest: StoryDTOs | undefined) => {
        if (storyTest) {
          this.storyTestDetails = storyTest;
          this.storyQuestionAndAnswersOBJ = storyTest.storyQuestionAndAnswers;
          console.log('Story Test Details:', this.storyTestDetails);
          console.log('Question and Answers:', this.storyQuestionAndAnswersOBJ);
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
    console.log(`Selected option for question index ${index}: ${option}`);
  }

  submitAnswers(): void {
    console.log('Submitting answers...');
    if (this.storyTestDetails && this.storyQuestionAndAnswersOBJ) {
      const answers: PatientStoryAnswersDTO[] = this.storyQuestionAndAnswersOBJ.map((question, index) => ({
        StoryQuestionId: question.storyId, // Ensure the correct property is used here
        StoryAnswer: this.selectedOptions[index] || ''
      }));

      const storyTestId = this.storyTestDetails.storyId;

      this.storyService.submitStoryTest(storyTestId, answers).subscribe(response => {
        console.log('Submit response:', response);
        if (response.isSuccess) {
          if (response.data && response.data.score !== undefined) {
            this.navigateToResults(response.data.score);
          } else {
            console.error('Score not found in response data');
          }
        } else {
          console.error('Failed to submit story test');
        }
      }, error => {
        console.error('Error submitting story test:', error);
      });
    }
  }

  navigateToResults(score: number): void {
    console.log('Navigating to results with score:', score);
    setTimeout(() => {
      this.router.navigate(['/results-test'], { queryParams: { score } });
      console.log('Navigation executed');
    }, 1000); // Example delay of 1000 milliseconds (1 second), adjust as needed
  }
}
 
//  implements OnInit {
//   storyTestDetails: StoryDTOs | undefined;
//   storyQuestionAndAnswersOBJ: StoryTestAnswersQuestionsDTO[] | undefined;
//   selectedOptions: { [index: number]: string } = {};
//   Pic_Sound_URl: string = "http://localhost:2100";


//   constructor(private storyService: StoryServicesService, private router: Router) {}

//   ngOnInit(): void {
//     this.storyService.getStoryTestSubject().subscribe(
//       (storyTest: StoryDTOs | undefined) => {
//         if (storyTest) {
//           this.storyTestDetails = storyTest;
//           this.storyQuestionAndAnswersOBJ = storyTest.storyQuestionAndAnswers;
//           console.log('Story Test Details:', this.storyTestDetails);
//           console.log('Question and Answers:', this.storyQuestionAndAnswersOBJ);
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
//     if (this.storyTestDetails && this.storyQuestionAndAnswersOBJ) {
//       const answers: PatientStoryAnswersDTO[] = this.storyQuestionAndAnswersOBJ.map((question, index) => ({
//         StoryQuestionId: question.storyId,
//         StoryAnswer: this.selectedOptions[index] || ''
//       }));

//       const storyTestId = this.storyTestDetails.storyId;

//       this.storyService.submitStoryTest(storyTestId, answers).subscribe(response => {
//         console.log('Submit response:', response);
//         if (response.isSuccess) {
//           this.navigateToResults(response.data.score); // Pass score to navigateToResults method
//         } else {
//           console.error('Failed to submit story test');
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
  
  // submitAnswers(): void {
  //   if (this.storyTestDetails && this.storyQuestionAndAnswersOBJ) {
  //     const answers: PatientStoryAnswersDTO[] = this.storyQuestionAndAnswersOBJ.map((question, index) => ({
  //       StoryQuestionId: question.storyId,
  //       StoryAnswer: this.selectedOptions[index] || ''
  //     }));

  //     const storyTestId = this.storyTestDetails.storyId;

  //     this.storyService.submitStoryTest(storyTestId, answers).subscribe(response => {
  //       console.log('Submit response:', response);
  //       if (response.isSuccess) {
  //         const score = response.data.data.score;
  //         this.router.navigate(['/results-test'], { queryParams: { score } });
  //       } else {
  //         console.error('Failed to submit story test');
  //       }
  //     });
  //   }
  // }
// }
 
//  implements OnInit {
//   storyTestId?: number;
//   storyTestDetails: StoryDTOs | null = null;
//   errorMessage: string = '';
//   selectedOptions: { [key: number]: string } = {}; // Track selected options per question

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private storyService: StoryServicesService
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.storyTestId = +params['storyTestId']; // Ensure it's a number
//       this.getStoryTestDetails(this.storyTestId);
//     });
//   }

//   getStoryTestDetails(storyTestId: number): void {
//     this.storyService.getStoryTest(storyTestId).subscribe(
//       (response: GeneralResponse<StoryDTOs>) => {
//         if (response.isSuccess) {
//           this.storyTestDetails = response.data;
//         } else {
//           this.errorMessage = 'Failed to fetch story test details.';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'An error occurred while fetching story test details.';
//         console.error('Error:', error);
//       }
//     );
//   }

//   selectOption(questionId: number, option: string) {
//     this.selectedOptions[questionId] = option;
//     console.log('Selected option for question', questionId, ':', option);
//   }

//   submitAnswers() {
//     if (!this.storyTestId || !this.storyTestDetails) {
//       this.errorMessage = 'Story test details are missing.';
//       return;
//     }

//     const patientStoryAnswers: PatientStoryAnswersDTO[] = this.storyTestDetails.storyQuestionAndAnswers.map(question => ({
//       StoryQuestionId: question.questionId,
//       StoryAnswer: this.selectedOptions[question.questionId] || ''
//     }));

//     this.storyService.submitStoryTest(this.storyTestId, patientStoryAnswers).subscribe(
//       (response: GeneralResponse<SubmitStoryTestResponse>) => {
//         if (response.isSuccess) {
//           const data = response.data;
//           if (typeof data === 'object' && 'score' in data) {
//             const score = data.score;
//             this.router.navigate(['/results-test'], { queryParams: { score } });
//           } else {
//             this.errorMessage = 'Unexpected response data format.';
//           }
//         } else {
//           this.errorMessage = 'Failed to submit story test.';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'An error occurred while submitting story test.';
//         console.error('Error:', error);
//       }
//     );
//   }
// }

//  implements OnInit {
//   storyTestId?: number;
//   storyTestDetails: StoryDTOs | null = null;
//   errorMessage: string = '';
//   selectedOptions: { [key: number]: string } = {}; // Track selected options per question

//   constructor(private route: ActivatedRoute, private storyService: StoryServicesService) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.storyTestId = +params['storyTestId']; // Ensure it's a number
//       this.getStoryTestDetails(this.storyTestId);
//     });
//   }

//   getStoryTestDetails(storyTestId: number): void {
//     this.storyService.getStoryTest(storyTestId).subscribe(
//       (response: GeneralResponse<StoryDTOs>) => {
//         if (response.isSuccess) {
//           this.storyTestDetails = response.data;
//         } else {
//           this.errorMessage = 'Failed to fetch story test details.';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'An error occurred while fetching story test details.';
//         console.error('Error:', error);
//       }
//     );
//   }

//   selectOption(questionId: number, option: string) {
//     this.selectedOptions[questionId] = option;
//     console.log('Selected option for question', questionId, ':', option);
//   }
// }

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TestInfoDto } from '../../../../models/Test/test-info-dto';
import { TestServiceService } from '../../../../services/TestService/test-service.service';
import { Router } from '@angular/router';
import { GeneralResponse } from '../../../../models/Story/general-response';
import { TestDTO } from '../../../../models/Test/test-dto';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../models/shared-module';


@Component({
  selector: 'app-all-tests',
  standalone: true,
  imports: [CommonModule , SharedModule],
  templateUrl: './all-tests.component.html',
  styleUrl: './all-tests.component.css'
})
export class AllTestsComponent  implements AfterViewInit {
  tests: TestInfoDto[] = [];
  errorMessage: string = '';

  constructor(
    private testService: TestServiceService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
    this.getAllTests();
  }

  // ngOnInit(): void {
  //   this.getAllTests();
  // }

  getAllTests(): void {
    this.testService.getAllTests().subscribe(
      (response: GeneralResponse<TestInfoDto[]>) => {
        if (response.isSuccess) {
          this.tests = response.data;
          console.log('Tests received:', this.tests);
        } else {
          this.errorMessage = 'Failed to load tests.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching the tests.';
        console.error('Error:', error);
      }
    );
  }

  takeTest(testId: number): void {
    this.testService.hasTest(testId).subscribe(
      (response: GeneralResponse<boolean>) => {
        if (response.isSuccess) {
          if (response.data) {
            console.log('User has already taken the test.');
            this.assignTest(true, testId);
          } else {
            console.log('Proceeding to take the test...');
            this.assignTest(false, testId);
          }
        } else {
          console.error('Failed to check test status:', response.data);
        }
      },
      (error) => {
        console.error('Error occurred while checking test status:', error);
      }
    );
  }

  assignTest(hasTest: boolean, testId: number): void {
    this.testService.assignTest(hasTest, testId).subscribe(
      (response: GeneralResponse<number | TestDTO>) => {
        if (response.isSuccess) {
          if (typeof response.data === 'number') {
            console.log('Assigned test score:', response.data);
            this.router.navigate(['/results-test'], { queryParams: { score: response.data } });
          } else {
              // // Handle StoryDTOs case
            const testDTOs = response.data;
            console.log('Assigned test DTO:', testDTOs);
            this.testService.setSubjectTest(testDTOs); // Store StoryDTOs in the service
            this.router.navigate(['/question-test']); // Navigate to QuestionTestComponent
           this.testService.setSubjectTest(response.data); // Set the data in the service


  // // Handle StoryDTOs case
  // const storyDTO = response.data;
  // this.storyService.setStoryTest(storyDTO); // Store StoryDTOs in the service
  // console.log('Assigned test DTO:', response.data,storyDTO);

  // this.storyService.setStoryTest(response.data); // Set the data in the service
  // this.router.navigate(['/story-test']);

          }
        } else {
          console.error('Failed to assign test:', response.data);
        }
      },
      (error) => {
        console.error('Error occurred while assigning test:', error);
      }
    );
  }
}



// implements OnInit {
//   tests: TestInfoDto[] = [];
//   errorMessage: string = '';

//   constructor(
//     private testService: TestServiceService,
//     private router: Router
//   ) { }

//   ngOnInit(): void {
//     this.getAllTests();
//   }

//   getAllTests(): void {
//     this.testService.getAllTests().subscribe(
//       (response: GeneralResponse<TestInfoDto[]>) => {
//         if (response.isSuccess) {
//           this.tests = response.data;
//           console.log('Tests received:', this.tests);
//         } else {
//           this.errorMessage = 'Failed to load tests.';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'An error occurred while fetching the tests.';
//         console.error('Error:', error);
//       }
//     );
//   }

//   takeTest(TestId: number): void {
//     this.testService.hasTest(TestId).subscribe(
//       (response: GeneralResponse<boolean>) => {
//         if (response.isSuccess) {
//           if (response.data) {
//             console.log('User has already taken the test.');
//             this.assignTest(true, TestId);
//           } else {
//             console.log('Proceeding to take the test...');
//             this.assignTest(false, TestId);
//           }
//         } else {
//           console.error('Failed to check test status:', response.data);
//         }
//       },
//       (error) => {
//         console.error('Error occurred while checking test status:', error);
//       }
//     );
//   }

//   assignTest(hasTest: boolean, TestId: number): void {
//     this.testService.assignTest(hasTest, TestId).subscribe(
//       (response: GeneralResponse<number | TestDTO>) => {
//         if (response.isSuccess) {
//           if (typeof response.data === 'number') {
//             console.log('Assigned test score:', response.data);
//             this.router.navigate(['/results-test'], { queryParams: { score: response.data } });
//           } else {
//             const testDTOs = response.data;
//             console.log('Assigned test DTO:', testDTOs);
//             this.router.navigate(['/QuestionTestComponent']);
//           }
//         } else {
//           console.error('Failed to assign test:', response.data);
//         }
//       },
//       (error) => {
//         console.error('Error occurred while assigning test:', error);
//       }
//     );
//   }
// }
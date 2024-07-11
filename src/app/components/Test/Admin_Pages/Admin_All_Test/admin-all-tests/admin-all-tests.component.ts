import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TestInfoDto } from '../../../../../models/Test/test-info-dto';
import { GeneralResponse } from '../../../../../models/Story/general-response';
import { TestServiceService } from '../../../../../services/TestService/test-service.service';
import { Router } from '@angular/router';
import { TestDTO } from '../../../../../models/Test/test-dto';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../models/shared-module';


@Component({
  selector: 'app-admin-all-tests',
  standalone: true,
  imports: [CommonModule , SharedModule],
  templateUrl: './admin-all-tests.component.html',
  styleUrl: './admin-all-tests.component.css'
})
export class AdminAllTestsComponent implements AfterViewInit {
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

  // navigateToEdit(testId: number): void {
  //   this.router.navigate(['/EditTestComponent', testId]); // Adjust route as per your routing configuration
  // }

  navigateToEdit(testId: number): void {
    console.log("id",testId);
    this.router.navigate(['/edit-test', testId]); // Ensure 'edit-test' matches your route configuration in routes.ts
  }
  navigateToAdd()
  {
    this.router.navigate(['/AddTestComponent']); // Ensure 'edit-test' matches your route configuration in routes.ts

  }

  deleteTest(testId: number): void {
    if (confirm('Are you sure you want to delete this test?')) {
      this.testService.deleteTest(testId).subscribe(
        (response: GeneralResponse<string>) => {
          if (response.isSuccess) {
            this.tests = this.tests.filter(test => test.testId !== testId);
            console.log(`Test with ID ${testId} deleted successfully.`);
          } else {
            console.error('Failed to delete test.');
          }
        },
        (error) => {
          console.error('An error occurred while deleting test:', error);
        }
      );
    }
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
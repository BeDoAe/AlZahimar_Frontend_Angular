import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestServiceService } from '../../../../../services/TestService/test-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTestDTO } from '../../../../../models/Test/add-test-dto';
import { GeneralResponse } from '../../../../../models/Story/general-response';
import { TestDTO } from '../../../../../models/Test/test-dto';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../models/shared-module';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-test',
  standalone: true,
  imports: [CommonModule ,SharedModule , ReactiveFormsModule],
  templateUrl: './edit-test.component.html',
  styleUrl: './edit-test.component.css'
})
export class EditTestComponent  implements OnInit {
  testForm: FormGroup;
  testId?: number;
  testAnswerQuestions: FormArray; // Define testAnswerQuestions as a FormArray

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.testForm = this.formBuilder.group({
      Title: ['', Validators.required],
      DegreeTest: ['', Validators.required],
      TestAnswerQuestions: this.formBuilder.array([])
    });

    this.testAnswerQuestions = this.testForm.get('TestAnswerQuestions') as FormArray; // Initialize testAnswerQuestions
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.testId = id ? +id : undefined; // Handle null or undefined case gracefully
      if (this.testId) {
        this.loadTestData(this.testId);
      }
    });
  }
  

  loadTestData(testId: number): void {
    this.testService.getTestById(testId).subscribe(
      (response: GeneralResponse<TestDTO>) => {
        if (response.isSuccess) {
          const test = response.data;
          console.log("in Edit recieved Data",response.data);
          this.testForm.patchValue({
            Title: test.title,
            DegreeTest: test.degreeTest
          });
          this.setTestAnswerQuestions(test.testAnswerQuestions);
          console.log("in Edit recieved Data",response.data.testAnswerQuestions);

        } else {
          console.error('Error loading test data:', response.data);
        }
      },
      (error) => {
        console.error('Error loading test data:', error);
      }
    );
  }

  setTestAnswerQuestions(testAnswerQuestions: any[]): void {
    this.testAnswerQuestions.clear(); // Clear existing form array
    testAnswerQuestions.forEach(question => {
      const answersFormArray = this.formBuilder.array(
        question.Answers.map((ans: any) => this.formBuilder.control(ans))
      );
      this.testAnswerQuestions.push(this.formBuilder.group({
        Question: question.Question,
        Answers: answersFormArray,
        CorrectAnswer: question.CorrectAnswer
      }));
    });
  }

  addQuestion(): void {
    this.testAnswerQuestions.push(this.formBuilder.group({
      Question: '',
      Answers: this.formBuilder.array([]),
      CorrectAnswer: ''
    }));
  }

  addAnswer(questionIndex: number): void {
    const answersFormArray = (this.testAnswerQuestions.at(questionIndex).get('Answers') as FormArray);
    answersFormArray.push(this.formBuilder.control(''));
  }

  onSubmit(): void {
    if (this.testForm.valid && this.testId !== undefined) { // Ensure testId is defined
      const updatedTest: AddTestDTO = {
        Title: this.testForm.value.Title,
        DegreeTest: this.testForm.value.DegreeTest,
        TestAnswerQuestions: this.testForm.value.TestAnswerQuestions
      };
  
      this.testService.updateTest(this.testId, updatedTest).subscribe(
        (response: GeneralResponse<string>) => {
          if (response.isSuccess) {
            console.log('Test updated successfully:', response.data);
            this.router.navigate(['AdminAllTestsComponent']);
          } else {
            console.error('Error updating test:', response.data);
          }
        },
        (error) => {
          console.error('Error updating test:', error);
        }
      );
    } else {
      console.error('Form is invalid or testId is undefined.');
    }
  }
  

  // Helper function to get answers form array of a question
  getAnswersArray(questionIndex: number): FormArray {
    const questionFormGroup = this.testAnswerQuestions.at(questionIndex) as FormGroup;
    return questionFormGroup.get('Answers') as FormArray;
  }
}

// implements OnInit {
//   testForm: FormGroup;

//   constructor(private fb: FormBuilder, private testService: TestServiceService) {
//     this.testForm = this.fb.group({
//       Title: ['', Validators.required],
//       DegreeTest: ['', Validators.required],
//       TestAnswerQuestions: this.fb.array([
//         this.createQuestionGroup()
//       ])
//     });
//   }

//   ngOnInit(): void {}

//   createQuestionGroup(): FormGroup {
//     return this.fb.group({
//       Question: ['', Validators.required],
//       Answers: this.fb.array([
//         this.fb.control('', Validators.required)
//       ]),
//       CorrectAnswer: ['', Validators.required]
//     });
//   }

//   get testAnswerQuestions(): FormArray {
//     return this.testForm.get('TestAnswerQuestions') as FormArray;
//   }

//   addQuestion(): void {
//     this.testAnswerQuestions.push(this.createQuestionGroup());
//   }

//   addAnswer(questionIndex: number): void {
//     const answers = this.getAnswersArray(questionIndex);
//     answers.push(this.fb.control('', Validators.required));
//   }

//   onSubmit(): void {
//     if (this.testForm.valid) {
//       const testDTO: AddTestDTO = this.testForm.value;
//       this.testService.addTest(testDTO).subscribe(response => {
//         console.log('Test added successfully', response);
//       });
//     } else {
//       console.log('Form is invalid. Cannot submit.');
//     }
//   }

//   // Helper function to safely access form array controls
//   getAnswersArray(questionIndex: number): FormArray {
//     const question = this.testAnswerQuestions.at(questionIndex) as FormGroup;
//     return question.get('Answers') as FormArray;
//   }
// }

// implements OnInit {

//   editTestForm: FormGroup;
//   testId: number = 0;

//   constructor(
//     private formBuilder: FormBuilder,
//     private testService: TestServiceService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.editTestForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       testDegree: [0, Validators.required],
//       testAnswerQuestions: this.formBuilder.array([])
//     });
//   }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     this.testId = id ? +id : 0; // Defaulting to 0 or any default value as per your logic
//     this.loadTestData(this.testId);
//   }

//   loadTestData(testId: number): void {
//     this.testService.getTestById(testId).subscribe(
//       (response: GeneralResponse<TestDTO>) => {
//         if (response.isSuccess) {
//           const test = response.data;
//           this.editTestForm.patchValue({
//             title: test.title,
//             testDegree: test.degreeTest,
//           });
//           this.setTestAnswerQuestions(test.testAnswerQuestions);
//         } else {
//           console.error('Error loading test data:', response.data);
//         }
//       },
//       (error) => {
//         console.error('Error loading test data:', error);
//       }
//     );
//   }

//   setTestAnswerQuestions(testAnswerQuestions: any[]): void {
//     const questionFormArray = this.editTestForm.get('testAnswerQuestions') as FormArray;
//     questionFormArray.clear();
//     testAnswerQuestions.forEach(question => {
//       questionFormArray.push(this.formBuilder.group({
//         Question: question.Question,
//         Answers: this.formBuilder.array(question.Answers.map((ans: any) => this.formBuilder.control(ans))),
//         CorrectAnswer: question.CorrectAnswer
//       }));
//     });
//   }

//   onSubmit(): void {
//     if (this.editTestForm.valid) {
//       const updatedTest: AddTestDTO = {
//         Title: this.editTestForm.value.title,
//         DegreeTest: this.editTestForm.value.testDegree,
//         TestAnswerQuestions: this.editTestForm.value.testAnswerQuestions
//       };

//       this.testService.updateTest(this.testId, updatedTest).subscribe(
//         (response: GeneralResponse<string>) => {
//           if (response.isSuccess) {
//             console.log('Test updated successfully:', response.data);
//             this.router.navigate(['/admin/tests']);
//           } else {
//             console.error('Error updating test:', response.data);
//           }
//         },
//         (error) => {
//           console.error('Error updating test:', error);
//         }
//       );
//     } else {
//       console.error('Form is invalid.');
//     }
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { TestServiceService } from '../../../../../services/TestService/test-service.service';
import { AddTestDTO } from '../../../../../models/Test/add-test-dto';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../models/shared-module';


@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ,SharedModule],
  styleUrls: ['./add-test.component.css']
})
 export class AddTestComponent implements OnInit {
  testForm: FormGroup;

  constructor(private fb: FormBuilder, private testService: TestServiceService) {
    this.testForm = this.fb.group({
      Title: ['', Validators.required],
      DegreeTest: ['', Validators.required],
      TestAnswerQuestions: this.fb.array([
        this.createQuestionGroup()
      ])
    });
  }

  ngOnInit(): void {}

  createQuestionGroup(): FormGroup {
    return this.fb.group({
      Question: ['', Validators.required],
      Answers: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      CorrectAnswer: ['', Validators.required]
    });
  }

  get testAnswerQuestions(): FormArray {
    return this.testForm.get('TestAnswerQuestions') as FormArray;
  }

  addQuestion(): void {
    this.testAnswerQuestions.push(this.createQuestionGroup());
  }

  addAnswer(questionIndex: number): void {
    const answers = this.getAnswersArray(questionIndex);
    answers.push(this.fb.control('', Validators.required));
  }

  onSubmit(): void {
    if (this.testForm.valid) {
      const testDTO: AddTestDTO = this.testForm.value;
      this.testService.addTest(testDTO).subscribe(response => {
        console.log('Test added successfully', response);
      });
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }

  // Helper function to safely access form array controls
  getAnswersArray(questionIndex: number): FormArray {
    const question = this.testAnswerQuestions.at(questionIndex) as FormGroup;
    return question.get('Answers') as FormArray;
  }
}
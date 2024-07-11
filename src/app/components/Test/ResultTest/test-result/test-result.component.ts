import { Component, OnInit } from '@angular/core';
import { ResultOfTestDTO } from '../../../../models/Test/result-of-test-dto';
import { TestServiceService } from '../../../../services/TestService/test-service.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-test-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-result.component.html',
  styleUrl: './test-result.component.css'
})
export class TestResultComponent implements OnInit {
  result: ResultOfTestDTO | null = null;
  formattedResults: { question: string; patientAnswer: string; correctAnswer: string; isCorrect: boolean }[] = [];

  constructor(private testService: TestServiceService , private router: Router) {}

  ngOnInit(): void {
    this.testService.getResult().subscribe(result => {
      console.log("Received result in TestResultComponent:", result); // Added log
      this.result = result;
      if (this.result) {
        this.formatResults();
      } else {
        console.error('Result is null or undefined'); // Added log
      }
    });
  }

  formatResults(): void {
    if (this.result) {
      this.formattedResults = Object.keys(this.result.patientAnswers).map(question => ({
        question,
        patientAnswer: this.result!.patientAnswers[question] || '', // Null check using non-null assertion operator
        correctAnswer: this.result!.testAnswers[question] || '',     // Null check using non-null assertion operator
        isCorrect: (this.result!.patientAnswers[question] || '') === (this.result!.testAnswers[question] || '')  // Null check using non-null assertion operator
      }));
    } else {
      this.formattedResults = [];
    }
  }
  goBack(): void {
    this.router.navigate(['/AllTests']); // Adjust the route as needed
  }
}
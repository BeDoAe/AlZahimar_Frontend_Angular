
import { LoginComponent } from './components/login/login.component';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/NavBar/nav-bar/nav-bar.component';
import { FooterComponent } from './components/Footer/footer/footer.component';
import { CardComponent } from './components/Card/card/card.component';
import { RouterModule } from '@angular/router';
import { DoctorprofileComponent } from './pages/DoctorProfile/doctorprofile/doctorprofile.component';
import { LandingComponent } from './components/landing/landing.component';
import { DoctorSignUpComponent } from './components/doctor-sign-up/doctor-sign-up.component';
import { RestPasswordComponent } from './components/rest-password/rest-password.component';
import { SharedModule } from './models/shared-module';
import { QuestionsComponent } from './components/story-test/questions/questions.component';
import { FormsModule } from '@angular/forms';
import { ResultsTestComponent } from './components/story-test/results-test/results-test.component';
import { BoardComponent } from './Games/NoughtsAndCrosses/board/board.component';
import { DoctorFilterComponent } from "./components/doctor-filter/doctor-filter.component";

import { AllStoriesComponent } from './components/story-test/StoriesTest/all-stories/all-stories.component';

import { AdminDashboardComponent } from "./pages/AdminDashboard/admin-dashboard/admin-dashboard.component";

import { StoryTestComponent } from './components/story-test/story-test.component';
import { AppointmentTimesComponent } from './components/appointment-times/appointment-times.component';
//import { HomeComponent } from './pages/home/home.component';

import { ReportsComponent } from "./components/reports/reports.component";
import { AllTestsComponent } from './components/Test/All_Tests/all-tests/all-tests.component';
import { QuestionTestComponent } from './components/Test/Test_Quesrion/question-test/question-test.component';
import { TestResultComponent } from './components/Test/ResultTest/test-result/test-result.component';

import { CommonModule } from '@angular/common';


import { AppointmentsWeeklyComponent } from "./components/appointments-weekly/appointments-weekly.component";
import { DoctorSidebarComponent } from "./components/doctor-sidebar/doctor-sidebar.component";

import { FirstTestComponent } from './components/Test/Specific_Tests/First_test/first-test/first-test.component';
import { SpecificTestResultComponent } from './components/Test/Specific_Tests/Specific_Test_Result/specific-test-result/specific-test-result.component';
import { SecondTestComponent } from './components/Test/Specific_Tests/Second_Test/second-test/second-test.component';
import { AddTestComponent } from './components/Test/Admin_Pages/Add_Test/add-test/add-test.component';
import { AdminAllTestsComponent } from './components/Test/Admin_Pages/Admin_All_Test/admin-all-tests/admin-all-tests.component';
import { EditTestComponent } from './components/Test/Admin_Pages/EditTest/edit-test/edit-test.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',

    imports: [BoardComponent, RouterOutlet, NavBarComponent, FooterComponent, CardComponent, LandingComponent, DoctorSignUpComponent, RouterModule, DoctorprofileComponent, LoginComponent, RestPasswordComponent, RouterOutlet, SharedModule, StoryTestComponent, QuestionsComponent, FormsModule, ResultsTestComponent, DoctorFilterComponent, AllStoriesComponent, AdminDashboardComponent, ReportsComponent ,AllTestsComponent ,QuestionTestComponent , TestResultComponent , FirstTestComponent , SpecificTestResultComponent , SecondTestComponent , AddTestComponent ,AppointmentsWeeklyComponent, DoctorSidebarComponent,AdminAllTestsComponent ,EditTestComponent,CommonModule]
})
export class AppComponent implements OnInit {
  showFooter: boolean = true;
  title = "remindme";
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check the current route to conditionally show or hide the footer
        this.showFooter = event.url === '/home';
        this.showFooter = event.url==='/aboutus';
        // this.showFooter= event.url==='/'
      }
    });
  }
}

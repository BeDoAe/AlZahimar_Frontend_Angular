import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorprofileComponent } from './pages/DoctorProfile/doctorprofile/doctorprofile.component';
import { RelativeSignUpComponent } from './components/relative-sign-up/relative-sign-up.component';
import { DoctorSignUpComponent } from './components/doctor-sign-up/doctor-sign-up.component';
import { PatientProfileComponent } from './pages/PatientProfile/patientprofile/patient-profile/patient-profile.component';



import { StickyNotesComponent } from './components/sticky-notes/sticky-notes.component';
import { PatientVisitedProfileComponent } from './pages/PatientVisitedProfile/patient-visited-profile/patient-visited-profile.component';


import { AllStoriesComponent } from './components/story-test/StoriesTest/all-stories/all-stories.component';
import { ResultsTestComponent } from './components/story-test/results-test/results-test.component';
import { QuestionsComponent } from './components/story-test/questions/questions.component';
import { DoctorDashboardComponent } from './pages/DoctorDashboard/doctor-dashboard/doctor-dashboard.component';

import { PatientsRequestsComponent } from './pages/DoctorDashboard/patients-requests/patients-requests.component';
import { AppointmentsRequestsComponent } from './pages/DoctorDashboard/appointments-requests/appointments-requests.component';
import { GameComponent } from './Games/Hangman/game/game.component';
import { GameBoardComponent } from './Games/MemoryCards/game-board/game-board.component';
import { BoardComponent } from './Games/NoughtsAndCrosses/board/board.component';
import { StoryTestComponent } from './components/story-test/story-test.component';

import { DoctorVisitedProfileComponent } from './pages/doctor-visited-profile/doctor-visited-profile.component';

import { AppointmentTimesComponent } from './components/appointment-times/appointment-times.component';


import { AdminDashboardComponent } from './pages/AdminDashboard/admin-dashboard/admin-dashboard.component';

//import { HomeComponent } from './pages/home/home.component';
import { AllTestsComponent } from './components/Test/All_Tests/all-tests/all-tests.component';

import { QuestionTestComponent } from './components/Test/Test_Quesrion/question-test/question-test.component';
import { TestResultComponent } from './components/Test/ResultTest/test-result/test-result.component';

import { DoctorSliderComponent } from './components/slider/slider.component';
import { BrowseDoctorsComponent } from './components/browse-doctors/browse-doctors.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomeComponent } from './pages/Home/home.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { AppointmentsWeeklyComponent } from './components/appointments-weekly/appointments-weekly.component';

import { FirstTestComponent } from './components/Test/Specific_Tests/First_test/first-test/first-test.component';
import { SpecificTestResultComponent } from './components/Test/Specific_Tests/Specific_Test_Result/specific-test-result/specific-test-result.component';
import { SecondTestComponent } from './components/Test/Specific_Tests/Second_Test/second-test/second-test.component';
import { AddTestComponent } from './components/Test/Admin_Pages/Add_Test/add-test/add-test.component';
import { AdminAllTestsComponent } from './components/Test/Admin_Pages/Admin_All_Test/admin-all-tests/admin-all-tests.component';
import { EditTestComponent } from './components/Test/Admin_Pages/EditTest/edit-test/edit-test.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'browseDoctors', component: BrowseDoctorsComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'doctorProfile', component: DoctorprofileComponent },
  { path: 'patientProfile', component: PatientProfileComponent },
  { path: 'registerDoctor', component: DoctorSignUpComponent },
  { path: 'registerRelative', component: RelativeSignUpComponent },
  {path:'notes',component:StickyNotesComponent},
  {path:'hangman',component:GameComponent},
  { path: 'memorycards', component: GameBoardComponent },
  { path: 'xo', component: BoardComponent },
  { path: 'VisitedPatientprofile/:id', component: PatientVisitedProfileComponent },
  { path: 'VisitedDoctorprofile/:id', component: DoctorVisitedProfileComponent },
  { path: 'results-test', component: ResultsTestComponent },
  {path:'appointmentTimes',component:AppointmentTimesComponent},
  { path: 'story-test', component: StoryTestComponent },
  {path:'aboutus',component:AboutusComponent },
  {path:'patientDashboard',component:PatientDashboardComponent},
  { path: 'AllStories', component: AllStoriesComponent },
  { path: 'story-test', component: StoryTestComponent },
  { path: 'Question', component: QuestionsComponent },
  { path: 'AcceptedAppointmets', component: AppointmentsWeeklyComponent },



  //Doctor dashboard
  { path: 'DoctorDashboard', component: DoctorDashboardComponent, children : [
    { path: 'PatientsRequests', component: PatientsRequestsComponent },
    { path: 'AppointmentsRequests', component: AppointmentsRequestsComponent },
  ] },


  {path : 'Admindashboard' , component : AdminDashboardComponent},

  {path:'AllTests', component: AllTestsComponent},
  // {path:'QuestionTestComponent' , component:QuestionTestComponent}
  { path: 'question-test', component: QuestionTestComponent },

  {path:'ResultsTest',component:TestResultComponent}
,
  { path: 'slider', component: DoctorSliderComponent },
  { path: 'contactus', component: ContactUsComponent },

  {path:'FirstTestComponent',component:FirstTestComponent},

  {path:'SpecificTestResultComponent' , component:SpecificTestResultComponent},


  {path:'SecondTestComponent' , component:SecondTestComponent},

  {path:'AddTestComponent' ,component :AddTestComponent },

  {path:'AdminAllTestsComponent' , component:AdminAllTestsComponent},
  {path:'edit-test', component :EditTestComponent},
  { path: 'edit-test/:id', component: EditTestComponent },



  { path: 'Question/:storyTestId', component: QuestionsComponent },

  { path: '**', component: PageNotFoundComponentComponent }
];

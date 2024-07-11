import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { StoryInfoDto } from '../../../../models/Story/story-info-dto';
import { StoryServicesService } from '../../../../services/StoryService/story-services.service';
import { GeneralResponse } from '../../../../models/Story/general-response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HasStoryTest } from '../../../../models/Story/has-story-test';
import { TrueAssignStoryTest } from '../../../../models/Story/true-assign-story-test';
import { StoryDTOs } from '../../../../models/Story/story-dtos';
import { SharedModule } from '../../../../models/shared-module';
// import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-all-stories',
  standalone: true,
  imports: [CommonModule , SharedModule],
  templateUrl: './all-stories.component.html',
  styleUrl: './all-stories.component.css'
})
export class AllStoriesComponent  implements OnInit , AfterViewInit {
  stories: StoryInfoDto[] = [];
  errorMessage: string = '';
  picURl:string= "http://localhost:2100" ;

  constructor(
    private storyService: StoryServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllStories();
  }

  ngAfterViewInit(): void {
    this.getAllStories();
  }

  getAllStories(): void {
    this.storyService.getAllStoryTests().subscribe(
      (response: GeneralResponse<StoryInfoDto[]>) => {
        if (response.isSuccess) {
          this.stories = response.data;
        } else {
          this.errorMessage = 'Failed to load stories.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching the stories.';
        console.error('Error:', error);
      }
    );
  }

  takeTest(storyTestId: number): void {
    this.storyService.hasStoryTest(storyTestId).subscribe(
      (response: GeneralResponse<boolean>) => {
        if (response.isSuccess) {
          if (response.data) {
            // User has already taken the test, navigate to ResultsTestComponent
            console.log('User has already taken the test.');
            this.assignStoryTest(true,storyTestId);

            // this.router.navigate(['/results-test'], { queryParams: { score: response.data } });
          } else {
            // User needs to take the test, proceed to assign test
            console.log('Proceeding to take the test...');
            this.assignStoryTest(false,storyTestId);
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
  
  assignStoryTest(hasStory: boolean, storyTestId: number): void {
    this.storyService.assignPatientStoryTest(hasStory, storyTestId).subscribe(
      (response: GeneralResponse<number | StoryDTOs>) => {
        if (response.isSuccess) {
          if (typeof response.data === 'number') {
            // Handle score case
            console.log('Assigned test score:', response.data);
            this.router.navigate(['/results-test'], { queryParams: { score: response.data } });
          } else {
            // Handle StoryDTOs case
            const storyDTO = response.data;
            this.storyService.setStoryTest(storyDTO); // Store StoryDTOs in the service
            console.log('Assigned test DTO:', response.data,storyDTO);

            this.storyService.setStoryTest(response.data); // Set the data in the service
            this.router.navigate(['/story-test']);
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
  

// assignStoryTest(hasStory: boolean, storyTestId: number): void {
//   this.storyService.assignPatientStoryTest(hasStory, storyTestId).subscribe(
//     (response: GeneralResponse<number | StoryDTOs>) => {
//       if (response.isSuccess) {
//         if (typeof response.data === 'number') {
//           // Case: Score received, navigate to ResultsTestComponent
//           console.log('Assigned test score:', response.data);
//           this.router.navigate(['/results-test'], { queryParams: { score: response.data } });
//         } else {
//           // Case: StoryDTOs received, navigate to StoryTestComponent
//           console.log('Assigned test DTO:', response.data);
//           this.router.navigate(['/story-test'], { state: { storyDTO: response.data } });
//         }
//       } else {
//         console.error('Failed to assign test:', response.data);
//       }
//     },
//     (error) => {
//       console.error('Error occurred while assigning test:', error);
//     }
//   );
// }
}
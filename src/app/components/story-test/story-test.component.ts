import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild ,ElementRef, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal for modal functionality
import { StoryDTOs } from '../../models/Story/story-dtos';
import { SharedModule } from '../../models/shared-module';
import { StoryServicesService } from '../../services/StoryService/story-services.service';
// import { PlyrComponent } from 'ngx-plyr';
declare const Plyr: any;

@Component({
  selector: 'app-story-test',
  standalone: true,
  imports: [CommonModule , SharedModule ],
  templateUrl: './story-test.component.html',
  styleUrl: './story-test.component.css'
})
 export class StoryTestComponent  implements AfterViewInit {
  storyTest?: StoryDTOs;
  audio!: HTMLAudioElement;
  Pic_Sound_URl: string = "http://localhost:2100";
  audioPlayed: boolean = false;

  @ViewChild('attentionModal') attentionModal!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private storyService: StoryServicesService
  ) {}

  ngAfterViewInit(): void {
    this.storyService.getStoryTestSubject().subscribe(
      (storyTest: StoryDTOs | undefined) => {
        if (storyTest) {
          this.storyTest = storyTest;
          if (this.storyTest?.storySoundPath) {
            this.audio = new Audio(this.Pic_Sound_URl + '/' + this.storyTest.storySoundPath);
            const player = new Plyr(this.audio);
          } else {
            console.error('Audio URL not found in the story test data.');
          }
        } else {
          console.error('No storyDTO data found.');
        }
      },
      (error) => {
        console.error('Error occurred while fetching storyDTO:', error);
      }
    );
  }

  openModal(content: any) {
    if (this.modalService && content) {
      this.modalService.open(content, { size: 'lg', centered: true });
    } else {
      console.error('Modal service or content not initialized.');
    }
  }

  dismissModal() {
    if (this.modalService) {
      this.modalService.dismissAll();
      this.stopAudio();
    } else {
      console.error('Modal service not initialized.');
    }
  }

  playAudioOnce() {
    if (this.audio && !this.audioPlayed) {
      this.audio.play();
      this.audioPlayed = true;
      this.audio.onended = () => {
        this.dismissModal();
      };
    } else {
      console.error('Audio element not found or audio has already been played.');
    }
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  goToQuestions(storyId?: number) {
    if (storyId) {
      this.router.navigate(['/Question']);
    } else {
      console.error('Story ID is not defined.');
    }
  }
}
 
 // implements AfterViewInit {
//   storyTest?: StoryDTOs;
//   audio!: HTMLAudioElement;
//   Pic_Sound_URl: string = "http://localhost:2100";
//   audioPlayed: boolean = false;

//   @ViewChild('attentionModal') attentionModal!: TemplateRef<any>;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private modalService: NgbModal,
//     private storyService: StoryServicesService
//   ) {}

//   ngAfterViewInit(): void {
//     this.storyService.getStoryTestSubject().subscribe(
//       (storyTest: StoryDTOs | undefined) => {
//         if (storyTest) {
//           this.storyTest = storyTest;
//           if (this.storyTest?.storySoundPath) {
//             this.audio = new Audio(this.Pic_Sound_URl + '/' + this.storyTest.storySoundPath);
//             const player = new Plyr(this.audio);
//           } else {
//             console.error('Audio URL not found in the story test data.');
//           }
//         } else {
//           console.error('No storyDTO data found.');
//         }
//       },
//       (error) => {
//         console.error('Error occurred while fetching storyDTO:', error);
//       }
//     );
//   }

//   openModal(content: any) {
//     this.modalService.open(content, { size: 'lg', centered: true });
//   }

//   dismissModal() {
//     this.modalService.dismissAll();
//     this.stopAudio();
//   }

//   playAudioOnce() {
//     if (this.audio && !this.audioPlayed) {
//       this.audio.play();
//       this.audioPlayed = true;
//       this.audio.onended = () => {
//         this.dismissModal();
//       };
//     } else {
//       console.error('Audio element not found or audio has already been played.');
//     }
//   }

//   stopAudio() {
//     if (this.audio) {
//       this.audio.pause();
//       this.audio.currentTime = 0;
//     }
//   }

//   goToQuestions(storyId?: number) {
//     if (storyId) {
//       this.router.navigate(['/Question']);
//     } else {
//       console.error('Story ID is not defined.');
//     }
//   }
// }
 
//  implements OnInit, AfterViewInit {
//   storyTest?: StoryDTOs;
//   audio!: HTMLAudioElement;
//   Pic_Sound_URl: string = "http://localhost:2100";
//   audioPlayed: boolean = false;

//   @ViewChild('attentionModal') attentionModal!: TemplateRef<any>;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private modalService: NgbModal,
//     private storyService: StoryServicesService
//   ) { }

//   ngOnInit(): void {
//     this.storyService.getStoryTestSubject().subscribe(
//       (storyTest: StoryDTOs | undefined) => {
//         if (storyTest) {
//           this.storyTest = storyTest;
//           console.log('Received storyDTO data:', this.storyTest);
//         } else {
//           console.error('No storyDTO data found.');
//         }
//       },
//       (error) => {
//         console.error('Error occurred while fetching storyDTO:', error);
//       }
//     );
//   }

//   ngAfterViewInit(): void {
//     if (this.storyTest?.storySoundPath) {
//       this.audio = new Audio(this.Pic_Sound_URl + '/' + this.storyTest.storySoundPath);
//       const player = new Plyr(this.audio);
//     } else {
//       console.error('Audio URL not found in the story test data.');
//     }

//     // Open modal after view initializes
//     this.openModal(this.attentionModal);
//   }

//   openModal(content: any) {
//     this.modalService.open(content, { size: 'lg', centered: true });
//   }

//   dismissModal() {
//     this.modalService.dismissAll();
//   }

//   playAudioOnce() {
//     if (this.audio && !this.audioPlayed) {
//       this.audio.play();
//       this.audioPlayed = true;
//       this.audio.onended = () => {
//         this.dismissModal();
//       };
//     } else {
//       console.error('Audio element not found or audio has already been played.');
//     }
//   }

//   goToQuestions(storyId?: number) {
//     if (storyId) {
//       this.router.navigate(['/Question']);
//     } else {
//       console.error('Story ID is not defined.');
//     }
//   }
  
// }
 
//  implements OnInit, AfterViewInit {
//   @ViewChild('attentionModal', { static: true }) attentionModal!: TemplateRef<any>;
//   audio!: HTMLAudioElement; // Declare audio as HTMLAudioElement type

//   storyTest?: StoryDTOs;
//   audioPlayed = false;
//   Pic_Sound_URl: string = "http://localhost:2100";

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private modalService: NgbModal
//   ) {}

//   ngOnInit(): void {
//     const navigation = this.router.getCurrentNavigation();
//     console.log('Current navigation state:', navigation);

//     if (navigation && navigation.extras.state) {
//       this.storyTest = navigation.extras.state['storyDTO'];
//       console.log('Received storyDTO data:', this.storyTest);
//     } else {
//       console.error('No storyDTO data found in router state.');
//     }
//   }

//   ngAfterViewInit(): void {
//     this.audio = document.getElementById('audioPlayer') as HTMLAudioElement; // Initialize audio
//     const player = new Plyr(this.audio); // Example usage with Plyr
//   }

//   openModal(content: any) {
//     this.modalService.open(content, { size: 'lg', centered: true });
//   }

//   dismissModal() {
//     this.modalService.dismissAll();
//   }

//   playAudioOnce() {
//     if (!this.audioPlayed) {
//       if (this.audio) {
//         this.audio.play();
//         this.audioPlayed = true;
//         this.audio.onended = () => {
//           this.dismissModal();
//         };
//       } else {
//         console.error('Audio element not found');
//       }
//     }
//   }

//   goToQuestions(storyId?: number) {
//     if (storyId) {
//       this.router.navigate(['/Question'], { state: { storyId } });
//     } else {
//       console.error('Story ID is not defined.');
//     }
//   }
// }








//  implements OnInit, AfterViewInit {
//   @ViewChild('attentionModal', { static: true }) attentionModal!: TemplateRef<any>;

//   storyTest?: StoryDTOs;
//   audioPlayed = false;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private modalService: NgbModal
//   ) {}

//   ngOnInit(): void {
//     const navigation = this.router.getCurrentNavigation();
//     if (navigation && navigation.extras.state) {
//       this.storyTest = navigation.extras.state['storyTest'];
//     } else {
//       console.error('No storyTest data found in router state.');
//     }
//   }

//   ngAfterViewInit(): void {
//     const player = new Plyr('#audioPlayer');
//   }


//   openModal(content: any) {
//    this.modalService.open(content, { size: 'lg', centered: true });

//   }

//   dismissModal() {
//     this.modalService.dismissAll();
//   }


//     // Play the audio only when the user confirms understanding in the modal
// const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
// audio.onended = () => {
//   this.modalService.dismissAll(); // Dismiss the modal when audio ends
// };


//   playAudioOnce() {
//     if (!this.audioPlayed) {
//       const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
//       if (audio) {
//         audio.play();
//         this.audioPlayed = true;
//         audio.onended = () => {
//           this.dismissModal();
//         };
//       } else {
//         console.error('Audio element not found');
//       }
//     }
//   }

//   goToQuestions(storyId?: number) {
//     if (storyId) {
//       this.router.navigate(['/Question'], { state: { storyId } });
//     } else {
//       console.error('Story ID is not defined.');
//     }

//   }
// }




// implements OnInit, AfterViewInit {

// [x: string]: any;
//   storyTest?: StoryDTOs;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private modalService: NgbModal
//   ) {}

//   ngOnInit(): void {
//     const navigation = this.router.getCurrentNavigation();
//     if (navigation && navigation.extras.state) {
//       this.storyTest = navigation.extras.state['storyTest'];
//     } else {
//       console.error('No storyTest data found in router state.');
//     }
//   }

//   ngAfterViewInit(): void {
//     const player = new Plyr('#audioPlayer');
//   }

//   openModal(content: any) {
//     this.modalService.open(content, { size: 'lg', centered: true });
//   }

//   playAudio(audioId: string, modalContent: any) {
//     // Open the modal warning before playing the audio
//     this.openModal(modalContent);

//     // Play the audio only when the user confirms understanding in the modal
//     const audio = document.getElementById(audioId) as HTMLAudioElement;
//     audio.onended = () => {
//       this.modalService.dismissAll(); // Dismiss the modal when audio ends
//     };
//   }
// }


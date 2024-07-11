// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { DoctorEditDTO } from '../../../models/Doctor/doctor-edit-dto';
// import { DoctorGetDTO } from '../../../models/Doctor/doctor-get-dto';
// import { DoctorProfileService } from '../../../services/DoctorServices/doctor-profile.service';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Subscription } from 'rxjs';




// @Component({
//   selector: 'app-edit-doctor-profile',
//   standalone: true,
//   imports: [ReactiveFormsModule],
//   templateUrl: './edit-doctor-profile.component.html',
//   styleUrl: './edit-doctor-profile.component.css'
// })
// export class EditDoctorProfileComponent
// implements OnInit, OnDestroy {
//   editProfileForm: FormGroup;
//   doctorProfileSubscription: Subscription | undefined;

//   constructor(
//     private fb: FormBuilder,
//     private doctorProfileService: DoctorProfileService
//   ) {
//     this.editProfileForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       userName: ['', Validators.required],
//       address: ['', Validators.required],
//       phone: ['', Validators.required],
//       age: ['', Validators.required],
//       gender: ['', Validators.required],
//       image: [null], // Updated to handle file upload
//       worksIn: [''],
//       history: [''],
//       price: [null]
//     });
//   }

//   ngOnInit(): void {
//     this.doctorProfileSubscription = this.doctorProfileService.getProfile().subscribe({
//       next: (doctor: DoctorGetDTO) => {
//         this.editProfileForm.patchValue({
//           firstName: doctor.firstName,
//           lastName: doctor.lastName,
//           userName: doctor.userName,
//           address: doctor.address,
//           phone: doctor.phone,
//           age: doctor.age,
//           gender: this.mapGenderStringToEnum(doctor.genderString),
//           worksIn: doctor.worksIn,
//           history: doctor.history,
//           price: 0
//         });
//       },
//       error: (error: any) => {
//         console.error('Error fetching doctor profile', error);
//       }
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.doctorProfileSubscription) {
//       this.doctorProfileSubscription.unsubscribe();
//     }
//   }

//   onSubmit(): void {
//     if (this.editProfileForm.valid) {
//       const editedProfile: DoctorEditDTO = this.editProfileForm.value;
//       this.doctorProfileService.updateDoctorProfile(editedProfile).subscribe({
//         next: () => {
//           console.log('Profile updated successfully');
//         },
//         error: (error: any) => {
//           console.error('Error updating profile', error);
//         }
//       });
//     }
//   }

//   private mapGenderStringToEnum(genderString: string): number {
//     return genderString.toLowerCase() === 'female' ? 1 : 0;
//   }
// }

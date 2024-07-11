import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RelativeRegisterServiceService } from '../../services/AuthenticationServices/RelativeAuthentication/relative-register-service.service';
import { RelativeRegisterDTO } from '../../models/Authentication/relative-register-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-relative-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './relative-sign-up.component.html',
  styleUrls: ['./relative-sign-up.component.css'],
})
export class RelativeSignUpComponent {
  isFormSubmitted = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private relativeRegisterService: RelativeRegisterServiceService) {
    this.registerForm = this.fb.group({
      // Data for Relative
      relativeFirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      relativeLastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      relativeUserName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      relativeEmail: ['', [Validators.email]],
      relativePhoneNumber: ['', [Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      relativeAddress: [''],
      relativeGender: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
      relativePassword: ['', [Validators.required, Validators.minLength(8)]],
      relativeConfirmPassword: ['', [Validators.required, Validators.minLength(8)]],

      // Data for Patient
      patientFirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      patientLastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      patientAge: ['', [Validators.required, Validators.min(0)]],
      patientAddress: [''],
      patientGender: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
      patientLocation: ['']
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.registerForm.valid) {
      const registerDto: RelativeRegisterDTO = this.registerForm.value;
      console.log(registerDto);
      this.relativeRegisterService.registerRelative(registerDto).subscribe({
        next: (response) => {
          if (!response.isSuccess &&response.isContainerNode===false) {
            this.registerForm.controls['relativeUserName'].setErrors({ notUnique: true });
          } else {
            Swal.fire({
              title: 'Good job!',
              text: 'Account Created Successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }
        },
        error: (err) => {
          if (err.error && err.error.data && err.error.isContainerNode===false) {
            this.registerForm.controls['userName'].setErrors({ notUnique: true });
          }
          if(err.error.errors.ConfirmPassword[0]==='The password and confirmation password do not match.')
            {
              this.registerForm.controls['confirmPassword'].setErrors({ notMatched: true });
            }
          if(err.error.errors.$.age[0]==='The JSON value could not be converted to System.In… $.age | LineNumber: 0 | BytePositionInLine: 163.')
            {
              this.registerForm.controls['age'].setErrors({ notText: true });
            }
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

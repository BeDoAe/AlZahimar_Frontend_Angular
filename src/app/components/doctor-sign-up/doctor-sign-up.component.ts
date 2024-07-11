import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorRegisterService } from '../../services/AuthenticationServices/DoctorAuthentication/doctor-register.service';
import { DoctorRegisterDTO } from '../../models/Authentication/doctor-register-dto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './doctor-sign-up.component.html',
  styleUrl: './doctor-sign-up.component.css'
})

export class DoctorSignUpComponent {
  isFormSubmitted = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private doctorRegisterService: DoctorRegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)],],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      cardNumber: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(25), Validators.max(90)]],
      gender: [null, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      price:['',[Validators.required,Validators.min(100), Validators.max(500)]]
    });
  }

  onSubmit() {
    console.log(this.registerForm);

    this.isFormSubmitted = true;
    if (this.registerForm.valid) {
      const registerDto: DoctorRegisterDTO = this.registerForm.value;
      console.log(registerDto);
      this.doctorRegisterService.registerDoctor(registerDto).subscribe({
        next: (response) => {
          // Handle successful response
          console.log('Account Created Successfully', response.data[0].code);
          if (response.isSuccess==false && response.data[0].code==='DuplicateUserName')
            {
              // console.log("noooooooooo");
              this.registerForm.controls['userName'].setErrors({ notUnique: true });
            }
            else{
            this.router.navigate(['/login']);
            }
          // Optionally, you can reset the form after successful submission

        },
        error: (err) => {
          // Handle error response
          console.error('Erroooor:', err);
          console.log("hiiiiiiiiii" );

          if (err.error && err.error.data && err.error.data[0].code === 'DuplicateUserName') {
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
      console.log('Form is not valid');
    }
  }

  onGenderChanged(value: string) {
    this.registerForm.patchValue({
      gender: value === 'female' ? 1 : 0
    });
  }

  get f() {
    return this.registerForm.controls;
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/AuthenticationServices/Logins/login.service';
import { Router } from '@angular/router';
//import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthenticationServices/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
// export class LoginComponent {
//   loginForm: FormGroup;
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private loginService: LoginService,
//     private authService: AuthService, // Inject AuthService
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
//       password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$')]]
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       const { username, password } = this.loginForm.value;

//       this.loginService.login(username, password).subscribe({
//         next: (response) => {
//           if (response.isSuccess) {
//             // Handle successful login
//             console.log('Login successful:', response.data);
//             // Store the token in local storage or a service
//             localStorage.setItem('token', response.data.token);

//             this.authService.setLoggedInState(true); // Emit login state change

//             // Redirect to dashboard or profile based on roles
//             if (response.data.roles.includes('Doctor')) {
//               this.router.navigate(['/doctorProfile']);
//             } else if (response.data.roles.includes('Relative')) {
//               this.router.navigate(['/patientProfile']);
//             } else if (response.data.roles.includes('Admin')) {
//               this.router.navigate(['/home']);
//             } else {
//               this.errorMessage = 'Unknown user role.';
//             }
//           } else {
//             // Handle login failure
//             this.errorMessage = 'Invalid username or password';
//           }
//         },
//         error: (error) => {
//           // Handle HTTP error
//           this.errorMessage = 'An error occurred. Please try again.';
//           console.error('Login error:', error);
//         }
//       });
//     }
//   }

//   get f() {
//     return this.loginForm.controls;
//   }
// }
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$')]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.loginService.login(username, password).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            // Handle successful login
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            this.authService.setLoggedInState(true);

            // Redirect to dashboard or profile based on roles
            if (response.data.roles.includes('Doctor')) {
              this.router.navigate(['/home']);
            } else if (response.data.roles.includes('Relative')) {
              this.router.navigate(['/home']);
            } else if (response.data.roles.includes('Admin')) {
              this.router.navigate(['/home']);
            } else {
              this.errorMessage = 'Unknown user role.';
            }
          } else {
            // Handle login failure based on specific messages
            if (typeof response.data === 'string') {
              if (response.data === 'In Progress') {
                Swal.fire({
                  title: 'Account Pending',
                  text: 'Your account is currently pending approval... Wait For Mail ',
                  icon: 'question'
                });
              } else if (response.data === "Your Data That You Entered isn't True Please Register Again") {
                Swal.fire({
                  icon: 'error',
                  title: 'Registration Error',
                  text: 'Your data is not correct. Please register again!',

                });
              } else {
                this.errorMessage = 'Invalid username or password';
              }
            }
          }
        },
        error: (error) => {
          // Handle HTTP error
          this.errorMessage = 'An error occurred. Please try again.';
          console.error('Login error:', error);
        }
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}

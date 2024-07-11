// import { CanActivate, CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/AuthenticationServices/auth.service';

// export class doctorGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     const userRole = this.authService.getUserRole();

//     // Check if user role is one of Admin, Relative, or Doctor
//     if ( userRole === 'Relative') {
//       return true;
//     } else {
//       this.router.navigate(['/unauthorized']); // Redirect to unauthorized page or login page
//       return false; // Block access
//     }
//   }
// }

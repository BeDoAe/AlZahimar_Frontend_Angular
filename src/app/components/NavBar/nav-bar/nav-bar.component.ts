import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/AuthenticationServices/auth.service';
import { SharedModule } from '../../../models/shared-module';
import { RoleService } from '../../../services/AuthenticationServices/role.service';
import { BehaviorSubject } from 'rxjs';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive,SharedModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
// export class NavBarComponent implements OnInit { // Implement OnInit
//   @ViewChild('navbar') navbar!: ElementRef;
//   isNavbarCollapsed = true;
//   isLoggedIn = false;
//   userRole: string | null = null;


//   constructor(private authService: AuthService, private router: Router) {
//     this.authService.getUserRole().subscribe(role => {
//     this.userRole = role;
//     console.log("Role:", this.userRole);
//   });}


//   ngOnInit(): void { // Subscribe to login state changes
//     this.authService.loggedInUser$.subscribe(isLoggedIn => {
//       this.isLoggedIn = isLoggedIn;
//     });

//   }



//   toggleNavbar() {
//     this.isNavbarCollapsed = !this.isNavbarCollapsed;
//   }

//   scrollToContactUs(event: Event) {
//     event.preventDefault();
//     const contactUsElement = document.getElementById('contact-us');
//     if (contactUsElement) {
//       contactUsElement.scrollIntoView({ behavior: 'smooth' });
//     }
//   }

//   scrollToAboutUs(event: Event) {
//     event.preventDefault();
//     const aboutUsElement = document.getElementById('about-us');
//     if (aboutUsElement) {
//       aboutUsElement.scrollIntoView({ behavior: 'smooth' });
//     }
//   }

//   logout() {
//     this.userRole = null;
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }

export class NavBarComponent implements OnInit {
  @ViewChild('navbar') navbar!: ElementRef;
  isNavbarCollapsed = true;
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
     this.authService.userRole$.subscribe(role => {
    this.userRole = role;
    console.log("Role:", this.userRole);
  });}

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });


  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  scrollToContactUs(event: Event) {
    event.preventDefault();
    const contactUsElement = document.getElementById('contact-us');
    if (contactUsElement) {
      contactUsElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToAboutUs(event: Event) {
    event.preventDefault();
    const aboutUsElement = document.getElementById('about-us');
    if (aboutUsElement) {
      aboutUsElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  logout() {
    this.userRole = null;
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-whatsapp-chat-with-my-doctor',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp-chat-with-my-doctor.component.html',
  styleUrl: './whatsapp-chat-with-my-doctor.component.css'
})
export class WhatsappChatWithMyDoctorComponent implements OnInit {
  doctorPhoneNumber: string = '';
  countryCode: string = '+2';
  @Input() doctorId: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDoctorPhoneNumber();
  }

  fetchDoctorPhoneNumber(): void {
    this.http.get(`${environment.baseUrl}/Doctor/MyDoctorPhoneNumber`, {
      responseType: 'text' // Specify responseType as text
    })
    .subscribe({
      next: response => {
        console.log('Doctor Phone Number:', response);
        this.doctorPhoneNumber = response.trim(); // Trim whitespace
      },
      error: error => {
        console.error('Error fetching doctor phone number:', error);
        // Handle error appropriately (e.g., show error message)
      }
    });
  }

  openWhatsAppChatWithMyDoctor(): void {
    if (this.doctorPhoneNumber) {
      const formattedPhoneNumber = this.formatPhoneNumber(this.doctorPhoneNumber);
      const message = encodeURIComponent('Hello, I need to connect with you.');
      const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    } else {
      console.error('Doctor phone number not available.');
      // Handle scenario where doctor phone number is not fetched or available
    }
  }

  formatPhoneNumber(phoneNumber: string): string {
    // Add country code if missing
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = `${this.countryCode}${phoneNumber}`;
    }
    return phoneNumber.replace(/[^0-9+]/g, ''); // Remove any non-numeric characters except '+'
  }
}


import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-whatsapp-chat',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp-chat.component.html',
  styleUrl: './whatsapp-chat.component.css'
})

export class WhatsappChatComponent implements OnInit {
  @Input() patientId: number = 0;
  relativePhoneNumber: string = '';
  countryCode: string = '+2';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchRelativePhoneNumber();
  }

  fetchRelativePhoneNumber(): void {
    console.log("pid", this.patientId);
    this.http.get(`${environment.baseUrl}/Relative/RelativePhoneNumber`, {
      params: { PatientId: this.patientId.toString() },
      responseType: 'text' // Indicate that we expect a plain text response
    })
    .subscribe({
      next: response => {
        console.log(response);
        this.relativePhoneNumber = response.trim();
        console.log(this.relativePhoneNumber);
      },
      error: error => {
        console.error('Error fetching relative phone number:', error);
        // Handle error appropriately (e.g., show error message)
      }
    });
  }



  openWhatsAppChat(): void {
    const formattedPhoneNumber = this.formatPhoneNumber(this.relativePhoneNumber);
    const message = encodeURIComponent('Hello, I need to connect with you.');
    const whatsappUrl = `https://wa.me/${formattedPhoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }



  formatPhoneNumber(phoneNumber: string): string {
    // Add country code if missing
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = `${this.countryCode}${phoneNumber}`;
    }
    return phoneNumber.replace(/[^0-9+]/g, ''); // Remove any non-numeric characters except +
  }
}

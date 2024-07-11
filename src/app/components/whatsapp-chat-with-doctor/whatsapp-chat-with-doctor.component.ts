import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-whatsapp-chat-with-doctor',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp-chat-with-doctor.component.html',
  styleUrl: './whatsapp-chat-with-doctor.component.css'
})
export class WhatsappChatWithDoctorComponent {
  @Input() doctorId:number=0;
  doctorPhoneNumber:string='';
  countryCode: string = '+2';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDoctorPhoneNumber();

  }

  fetchDoctorPhoneNumber(): void {
    console.log("did", this.doctorId);

    this.http.get(`${environment.baseUrl}/Doctor/DoctorPhoneNumber`, {
      params: { doctorId: this.doctorId.toString() },
      responseType: 'text' // Indicate that we expect a plain text response
    })
    .subscribe({
      next: response => {
        console.log(response);
        this.doctorPhoneNumber = response.trim();
        console.log(this.doctorPhoneNumber);
      },
      error: error => {
        console.error('Error fetching relative phone number:', error);
        // Handle error appropriately (e.g., show error message)
      }
    });
  }



  openWhatsAppChatWithDoctor(): void {
    const formattedPhoneNumber = this.formatPhoneNumber(this.doctorPhoneNumber);
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

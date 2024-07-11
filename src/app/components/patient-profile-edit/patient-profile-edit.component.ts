import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/PatientServices/patient.service';
import { RelativeDTO } from '../../models/Patient/relative-dto';
import { GeneralResponse } from '../../models/Story/general-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthenticationServices/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RelativeGetProfileDTO } from '../../models/Patient/relative-get-profile-dto';

@Component({
  selector: 'app-patient-profile-edit',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './patient-profile-edit.component.html',
  styleUrl: './patient-profile-edit.component.css'
})
export class PatientProfileEditComponent {
}

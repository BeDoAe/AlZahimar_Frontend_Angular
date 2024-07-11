import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RelativeDTO } from '../../../models/Patient/relative-dto';
import { DoctorProfileService } from '../../../services/DoctorServices/doctor-profile.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientVisitedProfileService } from '../../../services/PatientServices/patient-visited-profile.service';
import Swal from 'sweetalert2';
import { WhatsappChatComponent } from "../../../components/whatsapp-chat/whatsapp-chat.component";
import { jsPDF } from 'jspdf';
import { environment } from '../../../../environments/environment.development';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patient-visited-profile',
  standalone: true,
  templateUrl: './patient-visited-profile.component.html',
  styleUrl: './patient-visited-profile.component.css',
  imports: [CommonModule, WhatsappChatComponent]
})
export class PatientVisitedProfileComponent implements OnInit {
  patientId: number = 0;
  profileDataReport: any = {};
  profileData: RelativeDTO = new RelativeDTO();
  loggedInDoctorId: number | null = null;
  reportDetails: any = {};
  reportId:number=0;

  reports: any[] = []; // Define the reports property
  currentPage = 1;
  itemsPerPage = 3; // Number of reports per page
  totalReports = 0;
  numberOfPages: number = 0;

  @ViewChild('reportModal') reportModal!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private doctorProfileService: DoctorProfileService,
    private patientVisitedProfileService: PatientVisitedProfileService
    , private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = +params['id']; // Get patient ID from route parameters
      this.fetchRelativeProfile(this.patientId); // Fetch patient details based on ID
      this.fetchProfileAndReports(this.patientId);
      this.fetchLoggedInDoctorId();
    });
  }

  getImageUrl(): string {
    return environment.ImgbaseUrl;
  }

  fetchRelativeProfile(patientId: number): void {
    this.doctorProfileService.getRelativeProfile(patientId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.profileData = response.data;
          console.log('Relative Profile:', this.profileData); // Check if data is received
        } else {
          console.error('Error: Unsuccessful response', response);
        }
      },
      error: (error) => {
        console.error('Error fetching relative profile:', error);
      }
    });
  }

  fetchProfileAndReports(patientId: number): void {
    this.patientVisitedProfileService.getAllReports(patientId).subscribe({
      next: (reports) => {
        this.reports = reports.data;
      this.totalReports = this.reports.length;
      this.numberOfPages = Math.ceil(this.totalReports / this.itemsPerPage);
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch reports. Please try again later.'
        });
      }
    });
  }

  fetchLoggedInDoctorId(): void {
    this.patientVisitedProfileService.getLoggedInDoctorId().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.loggedInDoctorId = response.data;
        }
      },
      error: (error) => {
        console.error('Error fetching logged-in doctor ID:', error);
      }
    });
  }

  addReport(patientId: number): void {
    Swal.fire({
      title: 'Add Report',
      html: `
        <input id="add-title" class="swal2-input" placeholder="Title">
        <textarea id="add-description" class="swal2-textarea" placeholder="Description"></textarea>
        <label><input id="add-important" type="checkbox"> Mark as Important</label>
      `,
      preConfirm: () => {
        const title = (document.getElementById('add-title') as HTMLInputElement).value;
        const description = (document.getElementById('add-description') as HTMLTextAreaElement).value;
        const isImportant = (document.getElementById('add-important') as HTMLInputElement).checked;
        const ranking = isImportant ? 1 : 0; // Set ranking to 1 if important, else 0
        return { title, description, ranking };
      }
    }).then(result => {
      if (result.isConfirmed) {
        const reportDTO = {
          title: result.value.title,
          description: result.value.description,
          ranking: result.value.ranking
        };
        this.patientVisitedProfileService.addReport(patientId, reportDTO).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              Swal.fire('Added!', 'Report has been added successfully.', 'success');
              // Optionally, fetch updated profile data after adding the report
              this.fetchProfileAndReports(patientId);
            } else {
              Swal.fire('Error!', 'Failed to add report.', 'error');
            }
          },
          error: (error) => {
            console.error('Error adding report:', error);
            Swal.fire('Error!', 'Failed to add report. Please try again later.', 'error');
          }
        });
      }
    });
  }


  viewReport(reportId: number): void {
    this.patientVisitedProfileService.viewReport(reportId).subscribe({
      next: (response) => {
        const report = response.data;
        this.reportDetails = report;
        this.reportId=reportId;
        console.log("rrrr", report);
        this.modalService.open(this.reportModal, { centered: true });
      },
      error: (error) => {
        console.error('Error fetching report:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch report details. Please try again later.',
          icon: 'error'
        });
      }
    });
  }


  editReport(reportId: number): void {
    this.patientVisitedProfileService.viewReport(reportId).subscribe({
      next: (response) => {
        const report = response.data;

        Swal.fire({
          title: 'Edit Report',
          html: `
            <input id="edit-title" class="swal2-input" value="${report.title}" placeholder="Title">
            <textarea id="edit-description" class="swal2-textarea" placeholder="Description">${report.description}</textarea>
            <label>
              <input id="edit-important" type="checkbox" ${report.ranking === 1 ? 'checked' : ''}> Mark as Important
            </label>
          `,
          preConfirm: () => {
            const title = (document.getElementById('edit-title') as HTMLInputElement).value;
            const description = (document.getElementById('edit-description') as HTMLTextAreaElement).value;
            const isImportant = (document.getElementById('edit-important') as HTMLInputElement).checked;
            const ranking = isImportant ? 1 : 0;
            return { title, description, ranking };
          }
        }).then(result => {
          if (result.isConfirmed) {
            const updateReportDTO = {
              title: result.value.title,
              description: result.value.description,
              ranking: result.value.ranking
            };
            this.patientVisitedProfileService.updateReport(reportId, updateReportDTO).subscribe({
              next: (response) => {
                if (response.isSuccess) {
                  Swal.fire('Updated!', 'Report has been updated.', 'success');
                  this.fetchProfileAndReports(this.patientId); // Refresh the reports
                } else {
                  Swal.fire('Error!', 'Failed to update report.', 'error');
                }
              },
              error: (error) => {
                console.error('Error updating report:', error);
                Swal.fire({
                  title: 'Error!',
                  text: 'Failed to update report. Please try again later.',
                  icon: 'error'
                });
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Error fetching report for editing:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch report details. Please try again later.',
          icon: 'error'
        });
      }
    });
  }







  deleteReport(reportId: number): void {
    console.log('Attempting to delete report with ID:', reportId); // Add this log
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        this.patientVisitedProfileService.deleteReport(reportId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              // Remove the deleted report from the local array
              this.profileDataReport.reports = this.profileDataReport.reports.filter((report: any) => report.reportID !== reportId);
              Swal.fire('Deleted!', 'Report has been deleted.', 'success');
            }
          },
          error: (error) => {
            console.error('Error deleting report:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete report. Please try again later.',
              icon: 'error'
            });
          }
        });
      }
    });
  }

  downloadReportAsPDF(report: any): void {
    const doc = new jsPDF();

    const title = `Title: ${report.title}`;
    const patientName = `Patient Name: ${report.patientName}`;
    const doctorName = `Doctor Name: ${report.doctorName}`;
    const date = `Date: ${report.dateTime}`;

    // Positioning
    let y = 10; // Initial vertical position

    // Title
    doc.text(title, 10, y);
    y += 10; // Increment y position

    // Description
    const maxWidth = 190; // Maximum width for text
    const textLines = doc.splitTextToSize(`Description: ${report.description}`, maxWidth);
    doc.text(textLines, 10, y);
    y += (textLines.length * 7); // Adjust y position based on number of lines

    // Patient Name
    doc.text(patientName, 10, y);
    y += 10; // Increment y position

    // Doctor Name
    doc.text(doctorName, 10, y);
    y += 10; // Increment y position

    // Date
    doc.text(date, 10, y);

    doc.save(`${report.title}.pdf`);
  }
  get paginatedReports(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.reports.slice(startIndex, endIndex);
  }

  get pages(): number[] {
    return Array(this.numberOfPages).fill(0).map((x, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}

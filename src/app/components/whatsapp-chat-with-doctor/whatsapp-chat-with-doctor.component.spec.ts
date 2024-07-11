import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatWithDoctorComponent } from './whatsapp-chat-with-doctor.component';

describe('WhatsappChatWithDoctorComponent', () => {
  let component: WhatsappChatWithDoctorComponent;
  let fixture: ComponentFixture<WhatsappChatWithDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappChatWithDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatsappChatWithDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

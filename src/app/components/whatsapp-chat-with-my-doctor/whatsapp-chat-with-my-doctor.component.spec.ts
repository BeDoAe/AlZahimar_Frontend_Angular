import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatWithMyDoctorComponent } from './whatsapp-chat-with-my-doctor.component';

describe('WhatsappChatWithMyDoctorComponent', () => {
  let component: WhatsappChatWithMyDoctorComponent;
  let fixture: ComponentFixture<WhatsappChatWithMyDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappChatWithMyDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatsappChatWithMyDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

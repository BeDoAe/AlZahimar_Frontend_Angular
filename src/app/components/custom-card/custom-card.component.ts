import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.css'
})
export class CustomCardComponent {
  @Input() bgColor: string ='';
  @Input() img: string='';
  @Input() text: string='';
}

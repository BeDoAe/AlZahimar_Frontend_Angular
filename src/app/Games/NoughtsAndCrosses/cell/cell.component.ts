import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {
  @Input() value: string='';
  @Output() clickEvent = new EventEmitter<void>();

  handleClick() {
    this.clickEvent.emit();
  }
}

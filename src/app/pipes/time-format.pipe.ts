import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    // Assuming value is in the format "HH:mm:ss"
    const [hour, minute] = value.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM

    return `${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
  }
}

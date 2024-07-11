import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSelectedOptionStoryTest]',
  standalone: true
})
export class SelectedOptionStoryTestDirective {

  constructor(private ele: ElementRef<any>) {
    console.log(ele);
    ele.nativeElement.style.backgroundColor='red'
   }

}

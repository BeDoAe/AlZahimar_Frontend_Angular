import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { DoctorRegisterService } from '../services/AuthenticationServices/DoctorAuthentication/doctor-register.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

// export function uniqueUsernameValidator(
//   doctorRegisterService: DoctorRegisterService
// ): AsyncValidatorFn {
//   // return (control: AbstractControl): Observable<ValidationErrors | null> => {
//   //   return control.valueChanges.pipe(
//   //     switchMap(value => doctorRegisterService.isUsernameTaken(value)),
//   //     map(isTaken => (isTaken ? { notUnique: true } : null)),
//   //     catchError(() => of(null))
//   //   );
//   // };
// }

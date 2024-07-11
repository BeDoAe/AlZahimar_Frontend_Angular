import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrowseSharedService {

  private filterCriteriaSource = new BehaviorSubject<any>(null);
  filterCriteria$ = this.filterCriteriaSource.asObservable();

  updateFilterCriteria(criteria: any) {
    this.filterCriteriaSource.next(criteria);
  }
}

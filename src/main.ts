import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { SharedModule } from './app/models/shared-module';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);

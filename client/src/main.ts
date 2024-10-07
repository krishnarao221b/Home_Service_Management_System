import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),  // This enables the fetch API
    // Add any other providers from appConfig here if necessary
    ...appConfig.providers  // Spread existing providers from appConfig
  ],
})
  .catch((err) => console.error(err));

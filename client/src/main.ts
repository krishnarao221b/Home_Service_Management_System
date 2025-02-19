import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './app/core/interceptors/jwt.interceptor';
import { testInterceptor } from './app/core/interceptors/TestInterceptor';
import { jwtInterceptor } from './app/core/interceptors/jwtInterceptor';
import { provideToastr } from 'ngx-toastr'; // Add this import



bootstrapApplication(AppComponent, {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimations(), // Ensure animations are available
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      easeTime: 500,
      closeButton: true,
      newestOnTop: true,
    }),

    provideHttpClient(withInterceptors([testInterceptor])),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimations(), // Include animations
    provideHttpClient(withFetch()),
    provideRouter(routes),
    importProvidersFrom(), // Important for toastr
    ...appConfig.providers,
    // Other providers
  ],
}).catch(err => console.error(err));

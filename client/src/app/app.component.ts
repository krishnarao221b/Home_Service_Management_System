import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';  // Use CommonModule instead of BrowserModule
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IService } from './shared/models/service';
import { IPagination } from './shared/models/pagination';
import { CoreModule } from './core/core.module'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  // Replacing BrowserModule with CommonModule
    RouterOutlet,
    CoreModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Home Service';
  services: IService[] = [];  // Initialize with an empty array

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const sort = 'Desc';  // Example sort parameter (modify as per your requirement)
    const search = '';

    this.http.get<IPagination>('http://localhost:5092/api/services').subscribe({
      next: (response: IPagination) => {
        this.services = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

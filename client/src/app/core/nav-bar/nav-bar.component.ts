import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../../app.routes';
import { TestErrorComponent } from '../test-error/test-error.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [RouterOutlet,RouterModule, TestErrorComponent] // If you're using routing, include this
})
export class NavBarComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}

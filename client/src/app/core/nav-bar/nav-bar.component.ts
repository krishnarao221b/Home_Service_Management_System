import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [RouterOutlet] // If you're using routing, include this
})
export class NavBarComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}

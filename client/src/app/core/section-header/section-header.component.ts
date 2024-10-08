import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [BreadcrumbComponent, BreadcrumbItemDirective, CommonModule],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent implements OnInit {
  breadcrumb$!: Observable<any[]>;

  constructor(private bcService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumb$ = this.bcService.breadcrumbs$;
  }

  // Helper method to check if breadcrumbs is an array
  isBreadcrumbArray(breadcrumbs: any): boolean {
    return Array.isArray(breadcrumbs);
  }
}

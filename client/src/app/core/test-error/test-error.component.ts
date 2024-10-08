import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent implements OnInit{
  baseUrl = 'https://localhost:7015/api/';

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  get404Error() {
    this.http.get(this.baseUrl + 'services/42').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'services/fortytwo').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }






  }




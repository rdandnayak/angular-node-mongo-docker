import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { finalize, repeatWhen, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  todo$: Observable<any>;
  private reload = new Subject();
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.todo$ = this.http
      .get('/todo')
      .pipe(repeatWhen(() => this.reload.asObservable()));
  }

  async addTodo($event) {
    await this.http
      .post('/todo', {
        body: {
          item: $event.target.value,
        },
      })
      .pipe(finalize(() => this.reload.next()))
      .toPromise();

    $event.target.value = '';
  }
}

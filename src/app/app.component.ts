import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RequestService } from './shared/services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'TestApp';
  loader: boolean = false;
  constructor(private request: RequestService,
              private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.request.loader.subscribe(res => {
      this.loader = res;
    });
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
}

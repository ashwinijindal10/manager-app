import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() data;
  @Input() config;
  @Input() status;
  @Input() statusConfig;
  defaultConfig;
  constructor() { }

  ngOnInit() {
  }
}

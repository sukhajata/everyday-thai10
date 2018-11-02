import { Component, Input, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements OnInit {

  //@ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expanded') expanded;

  constructor() { }

  ngOnInit() {
  }

}

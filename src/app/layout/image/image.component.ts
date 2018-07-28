import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() imageUrl;
  photoUrl: string;

  constructor() { }

  ngOnInit() {
    this.photoUrl = this.imageUrl;
    console.log(this.photoUrl);
  }

}

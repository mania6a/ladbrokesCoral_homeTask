import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
declare var SC: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('image', [
      state('*', style({
        'width': '0px',
        'opacity': 0
      })),
      state('visible', style({
        'opacity': 1
      })),
      transition('* -> visible', animate('500ms 2s')),
      transition('visible -> *', animate(100))
    ])
  ]
})
export class LayoutComponent implements OnInit {
  photoUrl: string;
  trackUrl: string;
  song: any;
  state: string;
  isClicked = false;
  constructor() { }

  ngOnInit() {
  }

  toShowImage(event) {
    this.isClicked = false;
    this.photoUrl = '';
    this.state = '*';
    setTimeout(() => {
      this.song = event;
      this.state = 'visible';
      event.artwork_url ? this.photoUrl = event.artwork_url : this.photoUrl = event.waveform_url;
    }, 0);
  //  this.trackUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + event.id;
  }

  playSong() {
    this.isClicked = true;
      SC.initialize({
        client_id: 'f4094fb8beec3feadb35909471ac9bf5',
      });
      SC.stream('/tracks/' + this.song.id).then(function(player) {
        player.play();
      });
  }
}

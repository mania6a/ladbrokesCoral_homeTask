import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiRequestService} from '../../services/api-request.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output('showImage') showImage = new EventEmitter();
  withHolder = true;
  form: FormGroup;
  songs = [];
  result = [];
  songState: string;
  perPage: number;
  isNext = false;
  constructor(private apiRequest: ApiRequestService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'input': new FormControl('', [Validators.required])
    });
  }

  search(form) {
    const keyWord = form.get('input').value;
    this.result = [];
    this.perPage = 6;
    this.apiRequest.search(keyWord).subscribe((response: Array<any>) => {
      response.filter((song) => {
        if (song['title'].toLowerCase().includes(keyWord.toLowerCase())) {
          this.result.push(song);
        }
      });
      this.songs = this.result.slice(0, this.perPage);
      if (this.result.length > this.perPage) {
        this.isNext = true;
      }
    });
  }

  hideHolder() {
    this.withHolder = false;
  }

  getNext() {
    this.songs = this.result.slice(this.perPage, (this.perPage += 6));
    if (this.perPage > this.result.length) {
      this.isNext = false;
    }
  }

  toShowImage(song, index) {
    this.showImage.emit(song);
  }
}

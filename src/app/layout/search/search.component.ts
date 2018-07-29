import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiRequestService} from '../../services/api-request.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output('showImage') showImage = new EventEmitter();
  withHolder = true;
  form: FormGroup;
  songs = [];
  result = [];
  perPage: number;
  isNext = false;
  prevIndex: number;
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

  // fly and fade out and return the previous on place
  toShowImage(song, index) {
    if (this.prevIndex >=0) {
      document.getElementsByClassName('song')[this.prevIndex].classList.remove('move');
      document.getElementsByClassName('song')[this.prevIndex].classList.remove('hidden');
      document.getElementsByClassName('song')[this.prevIndex].classList.add('regular');
      console.log(document.getElementsByClassName('song')[this.prevIndex].classList);
    }
    document.getElementsByClassName('song')[index].classList.remove('regular');
    document.getElementsByClassName('song')[index].classList.add('move');
    setTimeout(() => {
      document.getElementsByClassName('song')[index].classList.add('hidden');
      }, 2000 );
    this.showImage.emit(song);
    this.prevIndex = index;
  }
}

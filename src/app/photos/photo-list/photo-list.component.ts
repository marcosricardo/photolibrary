import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Object[] = []; 
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  filter:string = "";
  
  constructor(private activatedRoute: ActivatedRoute, private photoService: PhotoService){
  }
  
  ngOnInit(){
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data.photos;
  }

  load() {
    this.photoService
        .listFromUserPaginated(this.userName, ++this.currentPage)
        .subscribe(photos => {
            this.filter = '';
            this.photos = this.photos.concat(photos);
            if(!photos.length) this.hasMore = false;
    });
  }
}

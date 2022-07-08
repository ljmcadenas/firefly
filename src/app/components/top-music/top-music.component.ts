import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SongDetail } from 'src/app/interfaces/song-detail.interface';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'top-music',
  templateUrl: './top-music.component.html',
  styleUrls: ['./top-music.component.scss']
})
export class TopMusicComponent implements OnInit, OnDestroy {
  public songs: SongDetail[] = [];
  
  private unsubscribeSubject = new Subject();

  constructor(private dataService: DataService) { }
  
  public ngOnInit() {
    this.dataService.getSongs()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((data) => {
        this.songs = data;
      });
  }

  public ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.unsubscribe();
  }
}

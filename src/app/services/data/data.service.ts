import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChangeType } from '../../enums/change-type.enum';
import { OverviewData } from '../../interfaces/overview-data.interface';
import { SongDetail } from '../../interfaces/song-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public getOverviewData(): Observable<OverviewData[]> {
    return of([
      {
        text: "Cat videos watched",
        changeType: ChangeType.Decrease,
        value: 198,
        periodDelta: 84
      },
      {
        text: "Slices of pizza in the fridge",
        changeType: ChangeType.Increase,
        value: 5,
        periodDelta: 2
      },
      {
        text: "Favourite songs beginning with the letter 'A'",
        changeType: ChangeType.Increase,
        value: 1324,
        periodDelta: 23
      }
    ]);
  }

  public getSongs(): Observable<SongDetail[]> {
    return of([
      {
        artist: "The Wiggles",
        plays: 86340,
        songs: 189
      },
      {
        artist: "Dolly Parton",
        plays: 86333,
        songs: 244
      },
      {
        artist: "Wellington International Ukulele Orchestra",
        plays: 85023,
        songs: 12
      }
    ]);
  }
}

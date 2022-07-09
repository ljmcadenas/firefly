import { NgModule } from '@angular/core';
import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';

@NgModule({
    imports: [MusicRoutingModule],
    declarations: [MusicComponent],
})
export class MusicModule { }

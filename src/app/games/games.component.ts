import { CommonModule } from '@angular/common';
import { Component, Input, Output, input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h3>Los juegos Favoritos de {{username}}</h3>
  <ul>
   @for (game of games;track game.id){
    <li (click)="fav(game.name)">{{game.name}}</li>
  }
  <ul>
  `,
  styles: ``
})
export class GamesComponent {
  @Input() username:String='';
  @Output() addFavoriteEvent=new EventEmitter<string>();
  fav(gameName:string){
    this.addFavoriteEvent.emit(gameName);
  }
  games = [
    {
      id: 1,
      name: 'Warzone'
    },
    {
      id: 2,
      name: 'Sonic'
    },
    {
      id: 3,
      name: 'Fortnite'
    }
  ]
}

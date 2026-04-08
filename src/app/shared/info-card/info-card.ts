import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-card',
  imports: [],
  templateUrl: './info-card.html',
  styleUrl: './info-card.css',
})
export class InfoCard implements OnInit{
  @Input() cardType: string = '';

  ngOnInit():void {
    console.log(this.cardType)
  }
}

import { CurrencyPipe, DatePipe, NgFor, NgIf, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { MoviesListComponent } from "./movies/movies-list/movies-list.component";
import { MenuComponent } from "./shared/components/menu/menu.component";
import { RatingComponent } from "./shared/components/rating/rating.component";

//Interpolation: allows to show dinamically the current value from this "class" inside the component html "class"
//pipe: allows to modify the values format of fields (dates, titles,etc.) via imports in the @component  
//property binding: allows with javascript([]) sentences call and show images with its URLs and with NgOptimizedImage optimize dynamic how are load one static image like one icon
//Priority allows you to configure the priority to load the images
//Events: allows to transmit events from html (template) to the class of the component (.ts) using "()" in html file
//Template reference variables: when you need, for example, to make click in one button but you need to use that click to call other element inside of the same html, yo should use a reference("#") to
//give a name or alias for that element and with that you can use it later in the button or in any other part
//[NgClass]: it is useful when we want to apply a CSS class to an element dynamically only if a condition is met (rating stars movies).
//<router-outlet> allows whenever we have a component that we want to display from a route, it is going to be put here inside
//Template driven form: their configuration primarily is in the component template (html).
//Reactive form: their configuration is in the  component class (.ts)
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MoviesListComponent, MenuComponent, RatingComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  processRating(rate:number){
    alert('You rated the movie '+rate)
  }

  duplicateNumber(value:number):number{
    return value*2;
  }
}

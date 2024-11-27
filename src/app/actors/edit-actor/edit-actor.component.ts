import { Component, Input, numberAttribute } from '@angular/core';
import { ActorCreationDTO, ActorDTO } from '../actors.models';
import { ActorsFormComponent } from "../actors-form/actors-form.component";
import moment from 'moment';

@Component({
  selector: 'app-edit-actor',
  standalone: true,
  imports: [ActorsFormComponent],
  templateUrl: './edit-actor.component.html',
  styleUrl: './edit-actor.component.css'
})
export class EditActorComponent {
  @Input({transform:numberAttribute})
  id!:number;

  model: ActorDTO = {id:1, name:'Tom Hanks', dateOfBirth: new Date('1948-05-25'), picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg/220px-Tom_Hanks_at_the_Elvis_Premiere_2022.jpg'};

  saveChanges(actor:ActorCreationDTO){
    actor.dateOfBirth = moment(actor.dateOfBirth).toDate();
    console.log('editing the actor',actor);
  }
}

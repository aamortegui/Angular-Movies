import { Component, OnInit, ViewChild } from '@angular/core';
import { ActorAutoCompleteDto } from '../actors.models';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-actors-autocomplete',
  standalone: true,
  imports: [MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule, MatIconModule, FormsModule, MatTableModule, MatInputModule],
  templateUrl: './actors-autocomplete.component.html',
  styleUrl: './actors-autocomplete.component.css'
})
export class ActorsAutocompleteComponent implements OnInit{  

  actors: ActorAutoCompleteDto[] =[
    {id:1, name:'Tom Holland', character:'', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Tom_Holland_at_KCA_2022.jpg/330px-Tom_Holland_at_KCA_2022.jpg'},
    {id:2, name:'Tom Hanks', character:'', picture:'https://upload.wikimedia.org/wikipedia/commons/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg'},
    {id:3, name:'Samuel L. Jackson', character:'', picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/375px-SamuelLJackson.jpg'}
  ]

  actorsOriginal = this.actors;

  actorsSelected: ActorAutoCompleteDto[] = [];

  control = new FormControl();

  columnsToDisplay = ['image', 'name', 'character', 'actions'];

  @ViewChild(MatTable)
  table!: MatTable<ActorAutoCompleteDto>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      this.actors = this.actorsOriginal;
      this.actors = this.actors.filter(actor => actor.name.indexOf(value) !== -1);
    })
  }

  handleSelection(event:MatAutocompleteSelectedEvent){
    this.actorsSelected.push(event.option.value);
    this.control.patchValue('');
    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  delete(actor: ActorAutoCompleteDto){
    const index = this.actorsSelected.findIndex((a:ActorAutoCompleteDto) => a.id === actor.id);
    this.actorsSelected.splice(index, 1);
    this.table.renderRows();
  }
}

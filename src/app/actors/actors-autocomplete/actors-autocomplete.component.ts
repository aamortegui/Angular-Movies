import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActorAutoCompleteDto } from '../actors.models';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-actors-autocomplete',
  standalone: true,
  imports: [MatFormFieldModule, MatAutocompleteModule, ReactiveFormsModule, MatIconModule, FormsModule, 
    MatTableModule, MatInputModule, DragDropModule],
  templateUrl: './actors-autocomplete.component.html',
  styleUrl: './actors-autocomplete.component.css'
})
export class ActorsAutocompleteComponent implements OnInit{  

  actorsService = inject(ActorsService);

  actors: ActorAutoCompleteDto[] =[];

  

  @Input({required:true})
  selectedActors: ActorAutoCompleteDto[] = [];

  control = new FormControl();

  columnsToDisplay = ['image', 'name', 'character', 'actions'];

  @ViewChild(MatTable)
  table!: MatTable<ActorAutoCompleteDto>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      if(typeof value === "string" && value){
        this.actorsService.getByName(value).subscribe(actors =>{
          this.actors = actors;
        });
      }
    })
  }

  handleSelection(event:MatAutocompleteSelectedEvent){
    this.selectedActors.push(event.option.value);
    this.control.patchValue('');
    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  delete(actor: ActorAutoCompleteDto){
    const index = this.selectedActors.findIndex((a:ActorAutoCompleteDto) => a.id === actor.id);
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

  handleDrop(event: CdkDragDrop<any[]>){
    const previousIndex = this.selectedActors.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}

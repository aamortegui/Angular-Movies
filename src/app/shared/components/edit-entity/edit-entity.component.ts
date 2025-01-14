import { AfterViewInit, Component, ComponentRef, inject, Input, numberAttribute, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { ICRUDService } from '../../interfaces/ICRUDService';
import { Router } from '@angular/router';
import { extractErrors } from '../../functions/extractErrors';
import { DisplayErrorsComponent } from "../display-errors/display-errors.component";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-edit-entity',
  standalone: true,
  imports: [DisplayErrorsComponent, LoadingComponent],
  templateUrl: './edit-entity.component.html',
  styleUrl: './edit-entity.component.css'
})
export class EditEntityComponent<TDTO,TCreationDTO> implements OnInit{

    @Input({transform:numberAttribute})
    CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO,TCreationDTO>;
    
    errors: string[] = [];
    loading: boolean = true;
    router = inject(Router);

    @Input({required: true})
    id!:number;

    @Input({required: true})
    title!: string;

    @Input({required: true})
    indexRoute!: string;

    @Input({required: true})
    formComponent: any;

    
      //to get a reference of a component here
      @ViewChild("contentForm", {read: ViewContainerRef})
      contentForm!: ViewContainerRef;
      private componentRef!: ComponentRef<any>;

    ngOnInit(): void {
      this.CRUDService.getById(this.id).subscribe(model => {
        this.loadComponent(model);
      });
    }

    loadComponent(model:any) {
      if(this.contentForm){
        this.componentRef = this.contentForm.createComponent(this.formComponent);
        this.componentRef.instance.model = model;
        this.componentRef.instance.postForm.subscribe((model: TCreationDTO) => {
          this.saveChanges(model);
        });
        this.loading = false;
      }      
    }

    saveChanges(entity:TCreationDTO){
      this.CRUDService.update(this.id, entity).subscribe({
        next: () => {
        this.router.navigate([this.indexRoute]);
        },
        error: err => {
        const errors = extractErrors(err);
          this.errors = errors;
        }
      });
    }
}

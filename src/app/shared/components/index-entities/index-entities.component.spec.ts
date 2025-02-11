import { TestBed } from "@angular/core/testing";
import { IndexEntitiesComponent } from "./index-entities.component";
import { ICRUDService } from "../../interfaces/ICRUDService";
import { CRUD_SERVICE_TOKEN } from "../../providers/providers";
import { of } from "rxjs";
import { RouterModule } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

describe('IndexEntitiesComponent', () =>{

    let mockICrudService: jasmine.SpyObj<ICRUDService<object,object>>;

    beforeEach(async () =>{

        mockICrudService = jasmine.createSpyObj<ICRUDService<object,object>>('ICRUDService',
            ['getPaginated', 'delete']);
        
        //of() (when is empty) allows to avoid execute the code that is inside of the fuction of the component,
        //in this case getPaginated
        mockICrudService.getPaginated.and.returnValue(of());
        //of({}) (with {} inside) allows to execute the code that is inside of the fuction of the component,
        //in this case delete
        mockICrudService.delete.and.returnValue(of({}));

        await TestBed.configureTestingModule({
            imports: [IndexEntitiesComponent, RouterModule.forRoot([]), SweetAlert2Module.forRoot()],
            providers: [
                {provide: CRUD_SERVICE_TOKEN, useValue: mockICrudService},
                provideAnimationsAsync()
            ]
        }).compileComponents();
    });

    it('should render the component',  () =>{
        const fixture = TestBed.createComponent(IndexEntitiesComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should set page to 1 when delete is called', () =>{
        //preparation
        const fixture = TestBed.createComponent(IndexEntitiesComponent);
        const component = fixture.componentInstance;
        const id = 1;
        component.pagination.page = 2;
        
        //Testing
        component.delete(id);

        //Verification
        expect(component.pagination.page).toBe(1);
    });

    it('should render the table if there are records to display', () =>{
        //preparation
        const fixture = TestBed.createComponent(IndexEntitiesComponent);
        const component = fixture.componentInstance;
        const response = new HttpResponse<object[]>({body:[{}]});

        //Testing
        mockICrudService.getPaginated.and.returnValue(of(response));

        component.loadRecords();

        fixture.detectChanges();
        //Verification
        const compiled =fixture.nativeElement as HTMLElement;
        expect(compiled.querySelectorAll('table').length).toBe(1);
    });

    it('should not render the table if there are no records to display', () =>{
        //preparation
        const fixture = TestBed.createComponent(IndexEntitiesComponent);
        const component = fixture.componentInstance;
        const response = new HttpResponse<object[]>({body:[]});

        //Testing
        mockICrudService.getPaginated.and.returnValue(of(response));

        component.loadRecords();

        fixture.detectChanges();
        //Verification
        const compiled =fixture.nativeElement as HTMLElement;
        expect(compiled.querySelectorAll('table').length).toBe(0);
    });
});
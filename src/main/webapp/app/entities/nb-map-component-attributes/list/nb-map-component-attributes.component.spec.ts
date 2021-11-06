import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NBMapComponentAttributesService } from '../service/nb-map-component-attributes.service';

import { NBMapComponentAttributesComponent } from './nb-map-component-attributes.component';

describe('NBMapComponentAttributes Management Component', () => {
  let comp: NBMapComponentAttributesComponent;
  let fixture: ComponentFixture<NBMapComponentAttributesComponent>;
  let service: NBMapComponentAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NBMapComponentAttributesComponent],
    })
      .overrideTemplate(NBMapComponentAttributesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NBMapComponentAttributesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NBMapComponentAttributesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.nBMapComponentAttributes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});

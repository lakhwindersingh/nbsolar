import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NBMapAttributesService } from '../service/nb-map-attributes.service';

import { NBMapAttributesComponent } from './nb-map-attributes.component';

describe('NBMapAttributes Management Component', () => {
  let comp: NBMapAttributesComponent;
  let fixture: ComponentFixture<NBMapAttributesComponent>;
  let service: NBMapAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NBMapAttributesComponent],
    })
      .overrideTemplate(NBMapAttributesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NBMapAttributesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NBMapAttributesService);

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
    expect(comp.nBMapAttributes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});

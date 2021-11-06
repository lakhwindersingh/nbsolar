import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NBMapComponentsService } from '../service/nb-map-components.service';

import { NBMapComponentsComponent } from './nb-map-components.component';

describe('NBMapComponents Management Component', () => {
  let comp: NBMapComponentsComponent;
  let fixture: ComponentFixture<NBMapComponentsComponent>;
  let service: NBMapComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NBMapComponentsComponent],
    })
      .overrideTemplate(NBMapComponentsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NBMapComponentsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NBMapComponentsService);

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
    expect(comp.nBMapComponents?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});

jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NBMapAttributesService } from '../service/nb-map-attributes.service';

import { NBMapAttributesDeleteDialogComponent } from './nb-map-attributes-delete-dialog.component';

describe('NBMapAttributes Management Delete Component', () => {
  let comp: NBMapAttributesDeleteDialogComponent;
  let fixture: ComponentFixture<NBMapAttributesDeleteDialogComponent>;
  let service: NBMapAttributesService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NBMapAttributesDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(NBMapAttributesDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(NBMapAttributesDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NBMapAttributesService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});

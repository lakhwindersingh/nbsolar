jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { INBMapComponentAttributes, NBMapComponentAttributes } from '../nb-map-component-attributes.model';
import { NBMapComponentAttributesService } from '../service/nb-map-component-attributes.service';

import { NBMapComponentAttributesRoutingResolveService } from './nb-map-component-attributes-routing-resolve.service';

describe('NBMapComponentAttributes routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: NBMapComponentAttributesRoutingResolveService;
  let service: NBMapComponentAttributesService;
  let resultNBMapComponentAttributes: INBMapComponentAttributes | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(NBMapComponentAttributesRoutingResolveService);
    service = TestBed.inject(NBMapComponentAttributesService);
    resultNBMapComponentAttributes = undefined;
  });

  describe('resolve', () => {
    it('should return INBMapComponentAttributes returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNBMapComponentAttributes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNBMapComponentAttributes).toEqual({ id: 123 });
    });

    it('should return new INBMapComponentAttributes if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNBMapComponentAttributes = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultNBMapComponentAttributes).toEqual(new NBMapComponentAttributes());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as NBMapComponentAttributes })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNBMapComponentAttributes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNBMapComponentAttributes).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});

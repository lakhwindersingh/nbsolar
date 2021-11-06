jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { INBMapComponents, NBMapComponents } from '../nb-map-components.model';
import { NBMapComponentsService } from '../service/nb-map-components.service';

import { NBMapComponentsRoutingResolveService } from './nb-map-components-routing-resolve.service';

describe('NBMapComponents routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: NBMapComponentsRoutingResolveService;
  let service: NBMapComponentsService;
  let resultNBMapComponents: INBMapComponents | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(NBMapComponentsRoutingResolveService);
    service = TestBed.inject(NBMapComponentsService);
    resultNBMapComponents = undefined;
  });

  describe('resolve', () => {
    it('should return INBMapComponents returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNBMapComponents = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNBMapComponents).toEqual({ id: 123 });
    });

    it('should return new INBMapComponents if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNBMapComponents = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultNBMapComponents).toEqual(new NBMapComponents());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as NBMapComponents })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNBMapComponents = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNBMapComponents).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});

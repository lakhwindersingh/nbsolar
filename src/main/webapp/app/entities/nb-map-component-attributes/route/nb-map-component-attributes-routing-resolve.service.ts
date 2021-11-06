import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INBMapComponentAttributes, NBMapComponentAttributes } from '../nb-map-component-attributes.model';
import { NBMapComponentAttributesService } from '../service/nb-map-component-attributes.service';

@Injectable({ providedIn: 'root' })
export class NBMapComponentAttributesRoutingResolveService implements Resolve<INBMapComponentAttributes> {
  constructor(protected service: NBMapComponentAttributesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INBMapComponentAttributes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((nBMapComponentAttributes: HttpResponse<NBMapComponentAttributes>) => {
          if (nBMapComponentAttributes.body) {
            return of(nBMapComponentAttributes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NBMapComponentAttributes());
  }
}

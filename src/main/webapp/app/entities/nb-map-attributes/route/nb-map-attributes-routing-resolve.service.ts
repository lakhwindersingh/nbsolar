import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INBMapAttributes, NBMapAttributes } from '../nb-map-attributes.model';
import { NBMapAttributesService } from '../service/nb-map-attributes.service';

@Injectable({ providedIn: 'root' })
export class NBMapAttributesRoutingResolveService implements Resolve<INBMapAttributes> {
  constructor(protected service: NBMapAttributesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INBMapAttributes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((nBMapAttributes: HttpResponse<NBMapAttributes>) => {
          if (nBMapAttributes.body) {
            return of(nBMapAttributes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NBMapAttributes());
  }
}

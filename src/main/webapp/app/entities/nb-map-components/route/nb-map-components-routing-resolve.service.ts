import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INBMapComponents, NBMapComponents } from '../nb-map-components.model';
import { NBMapComponentsService } from '../service/nb-map-components.service';

@Injectable({ providedIn: 'root' })
export class NBMapComponentsRoutingResolveService implements Resolve<INBMapComponents> {
  constructor(protected service: NBMapComponentsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INBMapComponents> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((nBMapComponents: HttpResponse<NBMapComponents>) => {
          if (nBMapComponents.body) {
            return of(nBMapComponents.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new NBMapComponents());
  }
}

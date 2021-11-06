import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NBMapComponentAttributesComponent } from '../list/nb-map-component-attributes.component';
import { NBMapComponentAttributesDetailComponent } from '../detail/nb-map-component-attributes-detail.component';
import { NBMapComponentAttributesUpdateComponent } from '../update/nb-map-component-attributes-update.component';
import { NBMapComponentAttributesRoutingResolveService } from './nb-map-component-attributes-routing-resolve.service';

const nBMapComponentAttributesRoute: Routes = [
  {
    path: '',
    component: NBMapComponentAttributesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NBMapComponentAttributesDetailComponent,
    resolve: {
      nBMapComponentAttributes: NBMapComponentAttributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NBMapComponentAttributesUpdateComponent,
    resolve: {
      nBMapComponentAttributes: NBMapComponentAttributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NBMapComponentAttributesUpdateComponent,
    resolve: {
      nBMapComponentAttributes: NBMapComponentAttributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nBMapComponentAttributesRoute)],
  exports: [RouterModule],
})
export class NBMapComponentAttributesRoutingModule {}

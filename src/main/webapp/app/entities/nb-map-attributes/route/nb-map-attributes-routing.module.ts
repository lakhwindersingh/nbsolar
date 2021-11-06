import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NBMapAttributesComponent } from '../list/nb-map-attributes.component';
import { NBMapAttributesDetailComponent } from '../detail/nb-map-attributes-detail.component';
import { NBMapAttributesUpdateComponent } from '../update/nb-map-attributes-update.component';
import { NBMapAttributesRoutingResolveService } from './nb-map-attributes-routing-resolve.service';

const nBMapAttributesRoute: Routes = [
  {
    path: '',
    component: NBMapAttributesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NBMapAttributesDetailComponent,
    resolve: {
      nBMapAttributes: NBMapAttributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NBMapAttributesUpdateComponent,
    resolve: {
      nBMapAttributes: NBMapAttributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NBMapAttributesUpdateComponent,
    resolve: {
      nBMapAttributes: NBMapAttributesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nBMapAttributesRoute)],
  exports: [RouterModule],
})
export class NBMapAttributesRoutingModule {}

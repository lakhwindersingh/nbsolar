import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NBMapComponentsComponent } from '../list/nb-map-components.component';
import { NBMapComponentsDetailComponent } from '../detail/nb-map-components-detail.component';
import { NBMapComponentsUpdateComponent } from '../update/nb-map-components-update.component';
import { NBMapComponentsRoutingResolveService } from './nb-map-components-routing-resolve.service';

const nBMapComponentsRoute: Routes = [
  {
    path: '',
    component: NBMapComponentsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NBMapComponentsDetailComponent,
    resolve: {
      nBMapComponents: NBMapComponentsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NBMapComponentsUpdateComponent,
    resolve: {
      nBMapComponents: NBMapComponentsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NBMapComponentsUpdateComponent,
    resolve: {
      nBMapComponents: NBMapComponentsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(nBMapComponentsRoute)],
  exports: [RouterModule],
})
export class NBMapComponentsRoutingModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NBMapComponentsComponent } from './list/nb-map-components.component';
import { NBMapComponentsDetailComponent } from './detail/nb-map-components-detail.component';
import { NBMapComponentsUpdateComponent } from './update/nb-map-components-update.component';
import { NBMapComponentsDeleteDialogComponent } from './delete/nb-map-components-delete-dialog.component';
import { NBMapComponentsRoutingModule } from './route/nb-map-components-routing.module';

@NgModule({
  imports: [SharedModule, NBMapComponentsRoutingModule],
  declarations: [
    NBMapComponentsComponent,
    NBMapComponentsDetailComponent,
    NBMapComponentsUpdateComponent,
    NBMapComponentsDeleteDialogComponent,
  ],
  entryComponents: [NBMapComponentsDeleteDialogComponent],
})
export class NBMapComponentsModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NBMapComponentAttributesComponent } from './list/nb-map-component-attributes.component';
import { NBMapComponentAttributesDetailComponent } from './detail/nb-map-component-attributes-detail.component';
import { NBMapComponentAttributesUpdateComponent } from './update/nb-map-component-attributes-update.component';
import { NBMapComponentAttributesDeleteDialogComponent } from './delete/nb-map-component-attributes-delete-dialog.component';
import { NBMapComponentAttributesRoutingModule } from './route/nb-map-component-attributes-routing.module';

@NgModule({
  imports: [SharedModule, NBMapComponentAttributesRoutingModule],
  declarations: [
    NBMapComponentAttributesComponent,
    NBMapComponentAttributesDetailComponent,
    NBMapComponentAttributesUpdateComponent,
    NBMapComponentAttributesDeleteDialogComponent,
  ],
  entryComponents: [NBMapComponentAttributesDeleteDialogComponent],
})
export class NBMapComponentAttributesModule {}

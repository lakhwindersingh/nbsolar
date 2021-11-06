import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NBMapAttributesComponent } from './list/nb-map-attributes.component';
import { NBMapAttributesDetailComponent } from './detail/nb-map-attributes-detail.component';
import { NBMapAttributesUpdateComponent } from './update/nb-map-attributes-update.component';
import { NBMapAttributesDeleteDialogComponent } from './delete/nb-map-attributes-delete-dialog.component';
import { NBMapAttributesRoutingModule } from './route/nb-map-attributes-routing.module';

@NgModule({
  imports: [SharedModule, NBMapAttributesRoutingModule],
  declarations: [
    NBMapAttributesComponent,
    NBMapAttributesDetailComponent,
    NBMapAttributesUpdateComponent,
    NBMapAttributesDeleteDialogComponent,
  ],
  entryComponents: [NBMapAttributesDeleteDialogComponent],
})
export class NBMapAttributesModule {}

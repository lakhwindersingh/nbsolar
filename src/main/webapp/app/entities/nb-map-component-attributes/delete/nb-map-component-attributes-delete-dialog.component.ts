import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INBMapComponentAttributes } from '../nb-map-component-attributes.model';
import { NBMapComponentAttributesService } from '../service/nb-map-component-attributes.service';

@Component({
  templateUrl: './nb-map-component-attributes-delete-dialog.component.html',
})
export class NBMapComponentAttributesDeleteDialogComponent {
  nBMapComponentAttributes?: INBMapComponentAttributes;

  constructor(protected nBMapComponentAttributesService: NBMapComponentAttributesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nBMapComponentAttributesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}

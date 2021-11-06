import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INBMapAttributes } from '../nb-map-attributes.model';
import { NBMapAttributesService } from '../service/nb-map-attributes.service';

@Component({
  templateUrl: './nb-map-attributes-delete-dialog.component.html',
})
export class NBMapAttributesDeleteDialogComponent {
  nBMapAttributes?: INBMapAttributes;

  constructor(protected nBMapAttributesService: NBMapAttributesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nBMapAttributesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}

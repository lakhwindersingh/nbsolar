import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INBMapComponents } from '../nb-map-components.model';
import { NBMapComponentsService } from '../service/nb-map-components.service';

@Component({
  templateUrl: './nb-map-components-delete-dialog.component.html',
})
export class NBMapComponentsDeleteDialogComponent {
  nBMapComponents?: INBMapComponents;

  constructor(protected nBMapComponentsService: NBMapComponentsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nBMapComponentsService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}

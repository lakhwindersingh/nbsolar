import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INBMapAttributes } from '../nb-map-attributes.model';
import { NBMapAttributesService } from '../service/nb-map-attributes.service';
import { NBMapAttributesDeleteDialogComponent } from '../delete/nb-map-attributes-delete-dialog.component';

@Component({
  selector: 'jhi-nb-map-attributes',
  templateUrl: './nb-map-attributes.component.html',
})
export class NBMapAttributesComponent implements OnInit {
  nBMapAttributes?: INBMapAttributes[];
  isLoading = false;

  constructor(protected nBMapAttributesService: NBMapAttributesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.nBMapAttributesService.query().subscribe(
      (res: HttpResponse<INBMapAttributes[]>) => {
        this.isLoading = false;
        this.nBMapAttributes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: INBMapAttributes): number {
    return item.id!;
  }

  delete(nBMapAttributes: INBMapAttributes): void {
    const modalRef = this.modalService.open(NBMapAttributesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.nBMapAttributes = nBMapAttributes;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

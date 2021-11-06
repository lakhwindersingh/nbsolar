import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INBMapComponentAttributes } from '../nb-map-component-attributes.model';
import { NBMapComponentAttributesService } from '../service/nb-map-component-attributes.service';
import { NBMapComponentAttributesDeleteDialogComponent } from '../delete/nb-map-component-attributes-delete-dialog.component';

@Component({
  selector: 'jhi-nb-map-component-attributes',
  templateUrl: './nb-map-component-attributes.component.html',
})
export class NBMapComponentAttributesComponent implements OnInit {
  nBMapComponentAttributes?: INBMapComponentAttributes[];
  isLoading = false;

  constructor(protected nBMapComponentAttributesService: NBMapComponentAttributesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.nBMapComponentAttributesService.query().subscribe(
      (res: HttpResponse<INBMapComponentAttributes[]>) => {
        this.isLoading = false;
        this.nBMapComponentAttributes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: INBMapComponentAttributes): number {
    return item.id!;
  }

  delete(nBMapComponentAttributes: INBMapComponentAttributes): void {
    const modalRef = this.modalService.open(NBMapComponentAttributesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.nBMapComponentAttributes = nBMapComponentAttributes;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

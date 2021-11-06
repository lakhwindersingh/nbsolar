import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INBMapComponents } from '../nb-map-components.model';
import { NBMapComponentsService } from '../service/nb-map-components.service';
import { NBMapComponentsDeleteDialogComponent } from '../delete/nb-map-components-delete-dialog.component';

@Component({
  selector: 'jhi-nb-map-components',
  templateUrl: './nb-map-components.component.html',
})
export class NBMapComponentsComponent implements OnInit {
  nBMapComponents?: INBMapComponents[];
  isLoading = false;

  constructor(protected nBMapComponentsService: NBMapComponentsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.nBMapComponentsService.query().subscribe(
      (res: HttpResponse<INBMapComponents[]>) => {
        this.isLoading = false;
        this.nBMapComponents = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: INBMapComponents): number {
    return item.id!;
  }

  delete(nBMapComponents: INBMapComponents): void {
    const modalRef = this.modalService.open(NBMapComponentsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.nBMapComponents = nBMapComponents;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

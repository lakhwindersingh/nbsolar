import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INBMapComponentAttributes } from '../nb-map-component-attributes.model';

@Component({
  selector: 'jhi-nb-map-component-attributes-detail',
  templateUrl: './nb-map-component-attributes-detail.component.html',
})
export class NBMapComponentAttributesDetailComponent implements OnInit {
  nBMapComponentAttributes: INBMapComponentAttributes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nBMapComponentAttributes }) => {
      this.nBMapComponentAttributes = nBMapComponentAttributes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

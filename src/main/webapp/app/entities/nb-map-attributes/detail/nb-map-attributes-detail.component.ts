import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INBMapAttributes } from '../nb-map-attributes.model';

@Component({
  selector: 'jhi-nb-map-attributes-detail',
  templateUrl: './nb-map-attributes-detail.component.html',
})
export class NBMapAttributesDetailComponent implements OnInit {
  nBMapAttributes: INBMapAttributes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nBMapAttributes }) => {
      this.nBMapAttributes = nBMapAttributes;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

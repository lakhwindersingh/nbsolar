import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INBMapComponents } from '../nb-map-components.model';

@Component({
  selector: 'jhi-nb-map-components-detail',
  templateUrl: './nb-map-components-detail.component.html',
})
export class NBMapComponentsDetailComponent implements OnInit {
  nBMapComponents: INBMapComponents | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nBMapComponents }) => {
      this.nBMapComponents = nBMapComponents;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

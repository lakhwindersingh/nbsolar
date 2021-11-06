import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { INBMapAttributes, NBMapAttributes } from '../nb-map-attributes.model';
import { NBMapAttributesService } from '../service/nb-map-attributes.service';

@Component({
  selector: 'jhi-nb-map-attributes-update',
  templateUrl: './nb-map-attributes-update.component.html',
})
export class NBMapAttributesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nbIDFK: [],
    nbTitle: [],
    nbTitleLocation: [],
    nbPaletteIDFK: [],
    nbChartIDFK: [],
    nbChartType: [],
    nbLastUpdated: [],
    nbLastUpdatedBy: [],
  });

  constructor(
    protected nBMapAttributesService: NBMapAttributesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nBMapAttributes }) => {
      this.updateForm(nBMapAttributes);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nBMapAttributes = this.createFromForm();
    if (nBMapAttributes.id !== undefined) {
      this.subscribeToSaveResponse(this.nBMapAttributesService.update(nBMapAttributes));
    } else {
      this.subscribeToSaveResponse(this.nBMapAttributesService.create(nBMapAttributes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INBMapAttributes>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(nBMapAttributes: INBMapAttributes): void {
    this.editForm.patchValue({
      id: nBMapAttributes.id,
      nbIDFK: nBMapAttributes.nbIDFK,
      nbTitle: nBMapAttributes.nbTitle,
      nbTitleLocation: nBMapAttributes.nbTitleLocation,
      nbPaletteIDFK: nBMapAttributes.nbPaletteIDFK,
      nbChartIDFK: nBMapAttributes.nbChartIDFK,
      nbChartType: nBMapAttributes.nbChartType,
      nbLastUpdated: nBMapAttributes.nbLastUpdated,
      nbLastUpdatedBy: nBMapAttributes.nbLastUpdatedBy,
    });
  }

  protected createFromForm(): INBMapAttributes {
    return {
      ...new NBMapAttributes(),
      id: this.editForm.get(['id'])!.value,
      nbIDFK: this.editForm.get(['nbIDFK'])!.value,
      nbTitle: this.editForm.get(['nbTitle'])!.value,
      nbTitleLocation: this.editForm.get(['nbTitleLocation'])!.value,
      nbPaletteIDFK: this.editForm.get(['nbPaletteIDFK'])!.value,
      nbChartIDFK: this.editForm.get(['nbChartIDFK'])!.value,
      nbChartType: this.editForm.get(['nbChartType'])!.value,
      nbLastUpdated: this.editForm.get(['nbLastUpdated'])!.value,
      nbLastUpdatedBy: this.editForm.get(['nbLastUpdatedBy'])!.value,
    };
  }
}

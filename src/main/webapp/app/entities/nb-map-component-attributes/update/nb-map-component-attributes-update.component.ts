import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { INBMapComponentAttributes, NBMapComponentAttributes } from '../nb-map-component-attributes.model';
import { NBMapComponentAttributesService } from '../service/nb-map-component-attributes.service';

@Component({
  selector: 'jhi-nb-map-component-attributes-update',
  templateUrl: './nb-map-component-attributes-update.component.html',
})
export class NBMapComponentAttributesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nbComponentIDFK: [],
    nbComponentName: [],
    nbLastUpdated: [],
    nbLastUpdatedBy: [],
  });

  constructor(
    protected nBMapComponentAttributesService: NBMapComponentAttributesService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nBMapComponentAttributes }) => {
      this.updateForm(nBMapComponentAttributes);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nBMapComponentAttributes = this.createFromForm();
    if (nBMapComponentAttributes.id !== undefined) {
      this.subscribeToSaveResponse(this.nBMapComponentAttributesService.update(nBMapComponentAttributes));
    } else {
      this.subscribeToSaveResponse(this.nBMapComponentAttributesService.create(nBMapComponentAttributes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INBMapComponentAttributes>>): void {
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

  protected updateForm(nBMapComponentAttributes: INBMapComponentAttributes): void {
    this.editForm.patchValue({
      id: nBMapComponentAttributes.id,
      nbComponentIDFK: nBMapComponentAttributes.nbComponentIDFK,
      nbComponentName: nBMapComponentAttributes.nbComponentName,
      nbLastUpdated: nBMapComponentAttributes.nbLastUpdated,
      nbLastUpdatedBy: nBMapComponentAttributes.nbLastUpdatedBy,
    });
  }

  protected createFromForm(): INBMapComponentAttributes {
    return {
      ...new NBMapComponentAttributes(),
      id: this.editForm.get(['id'])!.value,
      nbComponentIDFK: this.editForm.get(['nbComponentIDFK'])!.value,
      nbComponentName: this.editForm.get(['nbComponentName'])!.value,
      nbLastUpdated: this.editForm.get(['nbLastUpdated'])!.value,
      nbLastUpdatedBy: this.editForm.get(['nbLastUpdatedBy'])!.value,
    };
  }
}

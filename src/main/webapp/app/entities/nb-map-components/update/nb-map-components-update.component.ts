import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { INBMapComponents, NBMapComponents } from '../nb-map-components.model';
import { NBMapComponentsService } from '../service/nb-map-components.service';

@Component({
  selector: 'jhi-nb-map-components-update',
  templateUrl: './nb-map-components-update.component.html',
})
export class NBMapComponentsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nbIDFK: [],
    nbComponentID: [],
    nbComponentType: [],
    nbComponentValue: [],
    nbDefault: [],
    nbLastUpdated: [],
    nbLastUpdatedBy: [],
  });

  constructor(
    protected nBMapComponentsService: NBMapComponentsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nBMapComponents }) => {
      this.updateForm(nBMapComponents);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nBMapComponents = this.createFromForm();
    if (nBMapComponents.id !== undefined) {
      this.subscribeToSaveResponse(this.nBMapComponentsService.update(nBMapComponents));
    } else {
      this.subscribeToSaveResponse(this.nBMapComponentsService.create(nBMapComponents));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INBMapComponents>>): void {
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

  protected updateForm(nBMapComponents: INBMapComponents): void {
    this.editForm.patchValue({
      id: nBMapComponents.id,
      nbIDFK: nBMapComponents.nbIDFK,
      nbComponentID: nBMapComponents.nbComponentID,
      nbComponentType: nBMapComponents.nbComponentType,
      nbComponentValue: nBMapComponents.nbComponentValue,
      nbDefault: nBMapComponents.nbDefault,
      nbLastUpdated: nBMapComponents.nbLastUpdated,
      nbLastUpdatedBy: nBMapComponents.nbLastUpdatedBy,
    });
  }

  protected createFromForm(): INBMapComponents {
    return {
      ...new NBMapComponents(),
      id: this.editForm.get(['id'])!.value,
      nbIDFK: this.editForm.get(['nbIDFK'])!.value,
      nbComponentID: this.editForm.get(['nbComponentID'])!.value,
      nbComponentType: this.editForm.get(['nbComponentType'])!.value,
      nbComponentValue: this.editForm.get(['nbComponentValue'])!.value,
      nbDefault: this.editForm.get(['nbDefault'])!.value,
      nbLastUpdated: this.editForm.get(['nbLastUpdated'])!.value,
      nbLastUpdatedBy: this.editForm.get(['nbLastUpdatedBy'])!.value,
    };
  }
}

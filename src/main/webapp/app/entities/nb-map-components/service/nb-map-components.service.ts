import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INBMapComponents, getNBMapComponentsIdentifier } from '../nb-map-components.model';

export type EntityResponseType = HttpResponse<INBMapComponents>;
export type EntityArrayResponseType = HttpResponse<INBMapComponents[]>;

@Injectable({ providedIn: 'root' })
export class NBMapComponentsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nb-map-components');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nBMapComponents: INBMapComponents): Observable<EntityResponseType> {
    return this.http.post<INBMapComponents>(this.resourceUrl, nBMapComponents, { observe: 'response' });
  }

  update(nBMapComponents: INBMapComponents): Observable<EntityResponseType> {
    return this.http.put<INBMapComponents>(
      `${this.resourceUrl}/${getNBMapComponentsIdentifier(nBMapComponents) as number}`,
      nBMapComponents,
      { observe: 'response' }
    );
  }

  partialUpdate(nBMapComponents: INBMapComponents): Observable<EntityResponseType> {
    return this.http.patch<INBMapComponents>(
      `${this.resourceUrl}/${getNBMapComponentsIdentifier(nBMapComponents) as number}`,
      nBMapComponents,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INBMapComponents>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INBMapComponents[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNBMapComponentsToCollectionIfMissing(
    nBMapComponentsCollection: INBMapComponents[],
    ...nBMapComponentsToCheck: (INBMapComponents | null | undefined)[]
  ): INBMapComponents[] {
    const nBMapComponents: INBMapComponents[] = nBMapComponentsToCheck.filter(isPresent);
    if (nBMapComponents.length > 0) {
      const nBMapComponentsCollectionIdentifiers = nBMapComponentsCollection.map(
        nBMapComponentsItem => getNBMapComponentsIdentifier(nBMapComponentsItem)!
      );
      const nBMapComponentsToAdd = nBMapComponents.filter(nBMapComponentsItem => {
        const nBMapComponentsIdentifier = getNBMapComponentsIdentifier(nBMapComponentsItem);
        if (nBMapComponentsIdentifier == null || nBMapComponentsCollectionIdentifiers.includes(nBMapComponentsIdentifier)) {
          return false;
        }
        nBMapComponentsCollectionIdentifiers.push(nBMapComponentsIdentifier);
        return true;
      });
      return [...nBMapComponentsToAdd, ...nBMapComponentsCollection];
    }
    return nBMapComponentsCollection;
  }
}

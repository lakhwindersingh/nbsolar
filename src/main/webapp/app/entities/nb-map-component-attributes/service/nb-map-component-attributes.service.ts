import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INBMapComponentAttributes, getNBMapComponentAttributesIdentifier } from '../nb-map-component-attributes.model';

export type EntityResponseType = HttpResponse<INBMapComponentAttributes>;
export type EntityArrayResponseType = HttpResponse<INBMapComponentAttributes[]>;

@Injectable({ providedIn: 'root' })
export class NBMapComponentAttributesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nb-map-component-attributes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nBMapComponentAttributes: INBMapComponentAttributes): Observable<EntityResponseType> {
    return this.http.post<INBMapComponentAttributes>(this.resourceUrl, nBMapComponentAttributes, { observe: 'response' });
  }

  update(nBMapComponentAttributes: INBMapComponentAttributes): Observable<EntityResponseType> {
    return this.http.put<INBMapComponentAttributes>(
      `${this.resourceUrl}/${getNBMapComponentAttributesIdentifier(nBMapComponentAttributes) as number}`,
      nBMapComponentAttributes,
      { observe: 'response' }
    );
  }

  partialUpdate(nBMapComponentAttributes: INBMapComponentAttributes): Observable<EntityResponseType> {
    return this.http.patch<INBMapComponentAttributes>(
      `${this.resourceUrl}/${getNBMapComponentAttributesIdentifier(nBMapComponentAttributes) as number}`,
      nBMapComponentAttributes,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INBMapComponentAttributes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INBMapComponentAttributes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNBMapComponentAttributesToCollectionIfMissing(
    nBMapComponentAttributesCollection: INBMapComponentAttributes[],
    ...nBMapComponentAttributesToCheck: (INBMapComponentAttributes | null | undefined)[]
  ): INBMapComponentAttributes[] {
    const nBMapComponentAttributes: INBMapComponentAttributes[] = nBMapComponentAttributesToCheck.filter(isPresent);
    if (nBMapComponentAttributes.length > 0) {
      const nBMapComponentAttributesCollectionIdentifiers = nBMapComponentAttributesCollection.map(
        nBMapComponentAttributesItem => getNBMapComponentAttributesIdentifier(nBMapComponentAttributesItem)!
      );
      const nBMapComponentAttributesToAdd = nBMapComponentAttributes.filter(nBMapComponentAttributesItem => {
        const nBMapComponentAttributesIdentifier = getNBMapComponentAttributesIdentifier(nBMapComponentAttributesItem);
        if (
          nBMapComponentAttributesIdentifier == null ||
          nBMapComponentAttributesCollectionIdentifiers.includes(nBMapComponentAttributesIdentifier)
        ) {
          return false;
        }
        nBMapComponentAttributesCollectionIdentifiers.push(nBMapComponentAttributesIdentifier);
        return true;
      });
      return [...nBMapComponentAttributesToAdd, ...nBMapComponentAttributesCollection];
    }
    return nBMapComponentAttributesCollection;
  }
}

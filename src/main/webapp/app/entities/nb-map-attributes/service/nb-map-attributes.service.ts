import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INBMapAttributes, getNBMapAttributesIdentifier } from '../nb-map-attributes.model';

export type EntityResponseType = HttpResponse<INBMapAttributes>;
export type EntityArrayResponseType = HttpResponse<INBMapAttributes[]>;

@Injectable({ providedIn: 'root' })
export class NBMapAttributesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nb-map-attributes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(nBMapAttributes: INBMapAttributes): Observable<EntityResponseType> {
    return this.http.post<INBMapAttributes>(this.resourceUrl, nBMapAttributes, { observe: 'response' });
  }

  update(nBMapAttributes: INBMapAttributes): Observable<EntityResponseType> {
    return this.http.put<INBMapAttributes>(
      `${this.resourceUrl}/${getNBMapAttributesIdentifier(nBMapAttributes) as number}`,
      nBMapAttributes,
      { observe: 'response' }
    );
  }

  partialUpdate(nBMapAttributes: INBMapAttributes): Observable<EntityResponseType> {
    return this.http.patch<INBMapAttributes>(
      `${this.resourceUrl}/${getNBMapAttributesIdentifier(nBMapAttributes) as number}`,
      nBMapAttributes,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INBMapAttributes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INBMapAttributes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNBMapAttributesToCollectionIfMissing(
    nBMapAttributesCollection: INBMapAttributes[],
    ...nBMapAttributesToCheck: (INBMapAttributes | null | undefined)[]
  ): INBMapAttributes[] {
    const nBMapAttributes: INBMapAttributes[] = nBMapAttributesToCheck.filter(isPresent);
    if (nBMapAttributes.length > 0) {
      const nBMapAttributesCollectionIdentifiers = nBMapAttributesCollection.map(
        nBMapAttributesItem => getNBMapAttributesIdentifier(nBMapAttributesItem)!
      );
      const nBMapAttributesToAdd = nBMapAttributes.filter(nBMapAttributesItem => {
        const nBMapAttributesIdentifier = getNBMapAttributesIdentifier(nBMapAttributesItem);
        if (nBMapAttributesIdentifier == null || nBMapAttributesCollectionIdentifiers.includes(nBMapAttributesIdentifier)) {
          return false;
        }
        nBMapAttributesCollectionIdentifiers.push(nBMapAttributesIdentifier);
        return true;
      });
      return [...nBMapAttributesToAdd, ...nBMapAttributesCollection];
    }
    return nBMapAttributesCollection;
  }
}

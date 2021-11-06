import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INBMapComponentAttributes, NBMapComponentAttributes } from '../nb-map-component-attributes.model';

import { NBMapComponentAttributesService } from './nb-map-component-attributes.service';

describe('NBMapComponentAttributes Service', () => {
  let service: NBMapComponentAttributesService;
  let httpMock: HttpTestingController;
  let elemDefault: INBMapComponentAttributes;
  let expectedResult: INBMapComponentAttributes | INBMapComponentAttributes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NBMapComponentAttributesService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nbComponentIDFK: 'AAAAAAA',
      nbComponentName: 'AAAAAAA',
      nbLastUpdated: 'AAAAAAA',
      nbLastUpdatedBy: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a NBMapComponentAttributes', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new NBMapComponentAttributes()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NBMapComponentAttributes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nbComponentIDFK: 'BBBBBB',
          nbComponentName: 'BBBBBB',
          nbLastUpdated: 'BBBBBB',
          nbLastUpdatedBy: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NBMapComponentAttributes', () => {
      const patchObject = Object.assign(
        {
          nbComponentIDFK: 'BBBBBB',
          nbComponentName: 'BBBBBB',
        },
        new NBMapComponentAttributes()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NBMapComponentAttributes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nbComponentIDFK: 'BBBBBB',
          nbComponentName: 'BBBBBB',
          nbLastUpdated: 'BBBBBB',
          nbLastUpdatedBy: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a NBMapComponentAttributes', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNBMapComponentAttributesToCollectionIfMissing', () => {
      it('should add a NBMapComponentAttributes to an empty array', () => {
        const nBMapComponentAttributes: INBMapComponentAttributes = { id: 123 };
        expectedResult = service.addNBMapComponentAttributesToCollectionIfMissing([], nBMapComponentAttributes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nBMapComponentAttributes);
      });

      it('should not add a NBMapComponentAttributes to an array that contains it', () => {
        const nBMapComponentAttributes: INBMapComponentAttributes = { id: 123 };
        const nBMapComponentAttributesCollection: INBMapComponentAttributes[] = [
          {
            ...nBMapComponentAttributes,
          },
          { id: 456 },
        ];
        expectedResult = service.addNBMapComponentAttributesToCollectionIfMissing(
          nBMapComponentAttributesCollection,
          nBMapComponentAttributes
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NBMapComponentAttributes to an array that doesn't contain it", () => {
        const nBMapComponentAttributes: INBMapComponentAttributes = { id: 123 };
        const nBMapComponentAttributesCollection: INBMapComponentAttributes[] = [{ id: 456 }];
        expectedResult = service.addNBMapComponentAttributesToCollectionIfMissing(
          nBMapComponentAttributesCollection,
          nBMapComponentAttributes
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nBMapComponentAttributes);
      });

      it('should add only unique NBMapComponentAttributes to an array', () => {
        const nBMapComponentAttributesArray: INBMapComponentAttributes[] = [{ id: 123 }, { id: 456 }, { id: 71369 }];
        const nBMapComponentAttributesCollection: INBMapComponentAttributes[] = [{ id: 123 }];
        expectedResult = service.addNBMapComponentAttributesToCollectionIfMissing(
          nBMapComponentAttributesCollection,
          ...nBMapComponentAttributesArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nBMapComponentAttributes: INBMapComponentAttributes = { id: 123 };
        const nBMapComponentAttributes2: INBMapComponentAttributes = { id: 456 };
        expectedResult = service.addNBMapComponentAttributesToCollectionIfMissing([], nBMapComponentAttributes, nBMapComponentAttributes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nBMapComponentAttributes);
        expect(expectedResult).toContain(nBMapComponentAttributes2);
      });

      it('should accept null and undefined values', () => {
        const nBMapComponentAttributes: INBMapComponentAttributes = { id: 123 };
        expectedResult = service.addNBMapComponentAttributesToCollectionIfMissing([], null, nBMapComponentAttributes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nBMapComponentAttributes);
      });

      it('should return initial array if no NBMapComponentAttributes is added', () => {
        const nBMapComponentAttributesCollection: INBMapComponentAttributes[] = [{ id: 123 }];
        expectedResult = service.addNBMapComponentAttributesToCollectionIfMissing(nBMapComponentAttributesCollection, undefined, null);
        expect(expectedResult).toEqual(nBMapComponentAttributesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

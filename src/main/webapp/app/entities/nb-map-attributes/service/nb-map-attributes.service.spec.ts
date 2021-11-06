import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INBMapAttributes, NBMapAttributes } from '../nb-map-attributes.model';

import { NBMapAttributesService } from './nb-map-attributes.service';

describe('NBMapAttributes Service', () => {
  let service: NBMapAttributesService;
  let httpMock: HttpTestingController;
  let elemDefault: INBMapAttributes;
  let expectedResult: INBMapAttributes | INBMapAttributes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NBMapAttributesService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nbIDFK: 'AAAAAAA',
      nbTitle: 'AAAAAAA',
      nbTitleLocation: 'AAAAAAA',
      nbPaletteIDFK: 'AAAAAAA',
      nbChartIDFK: 'AAAAAAA',
      nbChartType: 'AAAAAAA',
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

    it('should create a NBMapAttributes', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new NBMapAttributes()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NBMapAttributes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nbIDFK: 'BBBBBB',
          nbTitle: 'BBBBBB',
          nbTitleLocation: 'BBBBBB',
          nbPaletteIDFK: 'BBBBBB',
          nbChartIDFK: 'BBBBBB',
          nbChartType: 'BBBBBB',
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

    it('should partial update a NBMapAttributes', () => {
      const patchObject = Object.assign(
        {
          nbTitle: 'BBBBBB',
          nbChartType: 'BBBBBB',
          nbLastUpdatedBy: 'BBBBBB',
        },
        new NBMapAttributes()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NBMapAttributes', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nbIDFK: 'BBBBBB',
          nbTitle: 'BBBBBB',
          nbTitleLocation: 'BBBBBB',
          nbPaletteIDFK: 'BBBBBB',
          nbChartIDFK: 'BBBBBB',
          nbChartType: 'BBBBBB',
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

    it('should delete a NBMapAttributes', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNBMapAttributesToCollectionIfMissing', () => {
      it('should add a NBMapAttributes to an empty array', () => {
        const nBMapAttributes: INBMapAttributes = { id: 123 };
        expectedResult = service.addNBMapAttributesToCollectionIfMissing([], nBMapAttributes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nBMapAttributes);
      });

      it('should not add a NBMapAttributes to an array that contains it', () => {
        const nBMapAttributes: INBMapAttributes = { id: 123 };
        const nBMapAttributesCollection: INBMapAttributes[] = [
          {
            ...nBMapAttributes,
          },
          { id: 456 },
        ];
        expectedResult = service.addNBMapAttributesToCollectionIfMissing(nBMapAttributesCollection, nBMapAttributes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NBMapAttributes to an array that doesn't contain it", () => {
        const nBMapAttributes: INBMapAttributes = { id: 123 };
        const nBMapAttributesCollection: INBMapAttributes[] = [{ id: 456 }];
        expectedResult = service.addNBMapAttributesToCollectionIfMissing(nBMapAttributesCollection, nBMapAttributes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nBMapAttributes);
      });

      it('should add only unique NBMapAttributes to an array', () => {
        const nBMapAttributesArray: INBMapAttributes[] = [{ id: 123 }, { id: 456 }, { id: 86911 }];
        const nBMapAttributesCollection: INBMapAttributes[] = [{ id: 123 }];
        expectedResult = service.addNBMapAttributesToCollectionIfMissing(nBMapAttributesCollection, ...nBMapAttributesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nBMapAttributes: INBMapAttributes = { id: 123 };
        const nBMapAttributes2: INBMapAttributes = { id: 456 };
        expectedResult = service.addNBMapAttributesToCollectionIfMissing([], nBMapAttributes, nBMapAttributes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nBMapAttributes);
        expect(expectedResult).toContain(nBMapAttributes2);
      });

      it('should accept null and undefined values', () => {
        const nBMapAttributes: INBMapAttributes = { id: 123 };
        expectedResult = service.addNBMapAttributesToCollectionIfMissing([], null, nBMapAttributes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nBMapAttributes);
      });

      it('should return initial array if no NBMapAttributes is added', () => {
        const nBMapAttributesCollection: INBMapAttributes[] = [{ id: 123 }];
        expectedResult = service.addNBMapAttributesToCollectionIfMissing(nBMapAttributesCollection, undefined, null);
        expect(expectedResult).toEqual(nBMapAttributesCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

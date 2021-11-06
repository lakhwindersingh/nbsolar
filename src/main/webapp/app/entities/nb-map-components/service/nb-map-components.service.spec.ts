import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INBMapComponents, NBMapComponents } from '../nb-map-components.model';

import { NBMapComponentsService } from './nb-map-components.service';

describe('NBMapComponents Service', () => {
  let service: NBMapComponentsService;
  let httpMock: HttpTestingController;
  let elemDefault: INBMapComponents;
  let expectedResult: INBMapComponents | INBMapComponents[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NBMapComponentsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nbIDFK: 'AAAAAAA',
      nbComponentID: 'AAAAAAA',
      nbComponentType: 'AAAAAAA',
      nbComponentValue: 'AAAAAAA',
      nbDefault: 'AAAAAAA',
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

    it('should create a NBMapComponents', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new NBMapComponents()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NBMapComponents', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nbIDFK: 'BBBBBB',
          nbComponentID: 'BBBBBB',
          nbComponentType: 'BBBBBB',
          nbComponentValue: 'BBBBBB',
          nbDefault: 'BBBBBB',
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

    it('should partial update a NBMapComponents', () => {
      const patchObject = Object.assign(
        {
          nbIDFK: 'BBBBBB',
          nbComponentID: 'BBBBBB',
          nbComponentType: 'BBBBBB',
          nbComponentValue: 'BBBBBB',
          nbDefault: 'BBBBBB',
        },
        new NBMapComponents()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NBMapComponents', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nbIDFK: 'BBBBBB',
          nbComponentID: 'BBBBBB',
          nbComponentType: 'BBBBBB',
          nbComponentValue: 'BBBBBB',
          nbDefault: 'BBBBBB',
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

    it('should delete a NBMapComponents', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addNBMapComponentsToCollectionIfMissing', () => {
      it('should add a NBMapComponents to an empty array', () => {
        const nBMapComponents: INBMapComponents = { id: 123 };
        expectedResult = service.addNBMapComponentsToCollectionIfMissing([], nBMapComponents);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nBMapComponents);
      });

      it('should not add a NBMapComponents to an array that contains it', () => {
        const nBMapComponents: INBMapComponents = { id: 123 };
        const nBMapComponentsCollection: INBMapComponents[] = [
          {
            ...nBMapComponents,
          },
          { id: 456 },
        ];
        expectedResult = service.addNBMapComponentsToCollectionIfMissing(nBMapComponentsCollection, nBMapComponents);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NBMapComponents to an array that doesn't contain it", () => {
        const nBMapComponents: INBMapComponents = { id: 123 };
        const nBMapComponentsCollection: INBMapComponents[] = [{ id: 456 }];
        expectedResult = service.addNBMapComponentsToCollectionIfMissing(nBMapComponentsCollection, nBMapComponents);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nBMapComponents);
      });

      it('should add only unique NBMapComponents to an array', () => {
        const nBMapComponentsArray: INBMapComponents[] = [{ id: 123 }, { id: 456 }, { id: 40586 }];
        const nBMapComponentsCollection: INBMapComponents[] = [{ id: 123 }];
        expectedResult = service.addNBMapComponentsToCollectionIfMissing(nBMapComponentsCollection, ...nBMapComponentsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nBMapComponents: INBMapComponents = { id: 123 };
        const nBMapComponents2: INBMapComponents = { id: 456 };
        expectedResult = service.addNBMapComponentsToCollectionIfMissing([], nBMapComponents, nBMapComponents2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nBMapComponents);
        expect(expectedResult).toContain(nBMapComponents2);
      });

      it('should accept null and undefined values', () => {
        const nBMapComponents: INBMapComponents = { id: 123 };
        expectedResult = service.addNBMapComponentsToCollectionIfMissing([], null, nBMapComponents, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nBMapComponents);
      });

      it('should return initial array if no NBMapComponents is added', () => {
        const nBMapComponentsCollection: INBMapComponents[] = [{ id: 123 }];
        expectedResult = service.addNBMapComponentsToCollectionIfMissing(nBMapComponentsCollection, undefined, null);
        expect(expectedResult).toEqual(nBMapComponentsCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

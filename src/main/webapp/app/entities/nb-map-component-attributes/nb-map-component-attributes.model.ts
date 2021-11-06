export interface INBMapComponentAttributes {
  id?: number;
  nbComponentIDFK?: string | null;
  nbComponentName?: string | null;
  nbLastUpdated?: string | null;
  nbLastUpdatedBy?: string | null;
}

export class NBMapComponentAttributes implements INBMapComponentAttributes {
  constructor(
    public id?: number,
    public nbComponentIDFK?: string | null,
    public nbComponentName?: string | null,
    public nbLastUpdated?: string | null,
    public nbLastUpdatedBy?: string | null
  ) {}
}

export function getNBMapComponentAttributesIdentifier(nBMapComponentAttributes: INBMapComponentAttributes): number | undefined {
  return nBMapComponentAttributes.id;
}

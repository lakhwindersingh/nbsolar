export interface INBMapComponents {
  id?: number;
  nbIDFK?: string | null;
  nbComponentID?: string | null;
  nbComponentType?: string | null;
  nbComponentValue?: string | null;
  nbDefault?: string | null;
  nbLastUpdated?: string | null;
  nbLastUpdatedBy?: string | null;
}

export class NBMapComponents implements INBMapComponents {
  constructor(
    public id?: number,
    public nbIDFK?: string | null,
    public nbComponentID?: string | null,
    public nbComponentType?: string | null,
    public nbComponentValue?: string | null,
    public nbDefault?: string | null,
    public nbLastUpdated?: string | null,
    public nbLastUpdatedBy?: string | null
  ) {}
}

export function getNBMapComponentsIdentifier(nBMapComponents: INBMapComponents): number | undefined {
  return nBMapComponents.id;
}

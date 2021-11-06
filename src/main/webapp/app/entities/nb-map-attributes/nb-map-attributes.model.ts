export interface INBMapAttributes {
  id?: number;
  nbIDFK?: string | null;
  nbTitle?: string | null;
  nbTitleLocation?: string | null;
  nbPaletteIDFK?: string | null;
  nbChartIDFK?: string | null;
  nbChartType?: string | null;
  nbLastUpdated?: string | null;
  nbLastUpdatedBy?: string | null;
}

export class NBMapAttributes implements INBMapAttributes {
  constructor(
    public id?: number,
    public nbIDFK?: string | null,
    public nbTitle?: string | null,
    public nbTitleLocation?: string | null,
    public nbPaletteIDFK?: string | null,
    public nbChartIDFK?: string | null,
    public nbChartType?: string | null,
    public nbLastUpdated?: string | null,
    public nbLastUpdatedBy?: string | null
  ) {}
}

export function getNBMapAttributesIdentifier(nBMapAttributes: INBMapAttributes): number | undefined {
  return nBMapAttributes.id;
}

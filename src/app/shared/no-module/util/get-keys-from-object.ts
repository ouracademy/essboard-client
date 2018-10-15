
export class GetKeys {
  public static source: any;

  public static setSource(alphas) {
    this.source = alphas;
  }
  public static getIndexs(dimensionMetadataId: number, stateMetadataId: number) {
    let indexDimension = this.source.map(function (item) { return item.metadataId; }).indexOf(dimensionMetadataId);
    let indexState = this.source[indexDimension].states.map(function (item) { return item.metadataId; }).indexOf(stateMetadataId);
    return {
      'dimension': indexDimension,
      'state': indexState
    }
  }
  public static getStateIndex(metadataId: string) {
    return this.source.indexOf({ metadataId: metadataId });
  }

}
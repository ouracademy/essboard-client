export interface AlphaTemplate {
  id: string
  name: string
  area: string
  states?: any[]
}

export interface StateTemplate {
  id: string
  name: string
  previousId: string
}

export interface CheckpointTemplate {
  id: string
  name: string
  description: string
  isVisibleInCard: string
}

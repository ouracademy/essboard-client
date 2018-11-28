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
  checklist?: CheckpointTemplate[]
}

export interface CheckpointTemplate {
  id: string
  name: string
  description: string
  isVisibleInCard: boolean
}

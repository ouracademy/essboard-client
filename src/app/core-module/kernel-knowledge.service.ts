import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { kernelApi } from '@env/environment'
import {
  AlphaTemplate,
  CheckpointTemplate
} from 'app/sessions/components/detail-alpha/kernel'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class KernelService {
  constructor(private httpClient: HttpClient) {
    this.requestToOpenServer()
  }

  getAlphas(): Observable<AlphaTemplate[]> {
    return this.httpClient.get<any[]>(`${kernelApi}/kernel/alphas`)
  }

  getAlpha(alphaId): Observable<AlphaTemplate> {
    return this.httpClient.get<AlphaTemplate>(
      `${kernelApi}/kernel/alphas/${alphaId}`
    )
  }

  getCheckpoints(stateId): Observable<CheckpointTemplate[]> {
    return this.httpClient.get<CheckpointTemplate[]>(
      `${kernelApi}/kernel/states/${stateId}/checkpoints`
    )
  }

  requestToOpenServer() {
    return this.httpClient.get<CheckpointTemplate[]>(
      `${kernelApi}/kernel/alphas`
    )
  }
}

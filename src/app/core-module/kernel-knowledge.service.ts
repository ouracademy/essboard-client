import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { kernelApi } from '@env/environment'
import { CheckpointTemplate } from 'app/sessions/components/detail-alpha/kernel'
import { AlphaTemplate } from 'app/sessions/components/detail-alpha/kernel'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class KernelService {
  constructor(private httpClient: HttpClient) {}

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
}

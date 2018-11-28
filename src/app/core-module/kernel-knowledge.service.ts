import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { urlEssenceKernel } from '@env/environment'
import { CheckpointTemplate } from 'app/sessions/components/detail-alpha/kernel'
import { AlphaTemplate } from 'app/sessions/components/detail-alpha/kernel'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class KernelService {
  constructor(private httpClient: HttpClient) {}

  getAlphas(): Observable<AlphaTemplate[]> {
    return this.httpClient.get<any[]>(`${urlEssenceKernel}/kernel`)
  }

  getAlpha(alphaId): Observable<AlphaTemplate> {
    return this.httpClient.get<AlphaTemplate>(
      `${urlEssenceKernel}/kernel/alphas/${alphaId}`
    )
  }

  getCheckpoints(stateId): Observable<CheckpointTemplate[]> {
    return this.httpClient.get<CheckpointTemplate[]>(
      `${urlEssenceKernel}/kernel/states/${stateId}/checkpoints`
    )
  }
}

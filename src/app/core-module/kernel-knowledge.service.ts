import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { urlEssenceKernel } from '@env/environment'
import {
  StateTemplate,
  CheckpointTemplate
} from 'app/sessions/components/detail-alpha/kernel'
import { AlphaTemplate } from 'app/sessions/components/detail-alpha/kernel'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

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
    // return this.getAlphas().pipe(
    //   map(alphas => alphas.find(alpha => alpha.id === alphaId))
    // )
  }

  getStates(alphaId): Observable<StateTemplate[]> {
    return this.httpClient.get<any[]>(
      `${urlEssenceKernel}/kernel/alphas/${alphaId}`
    )
  }

  getSchemaKernel() {
    return this.httpClient.get(`${urlEssenceKernel}/kernel/schema`)
  }

  getCheckpoints(stateId): Observable<CheckpointTemplate[]> {
    return this.httpClient.get<CheckpointTemplate[]>(
      `${urlEssenceKernel}/kernel/states/${stateId}/checkpoints`
    )
  }
}

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { urlEssenceKernel } from '@env/environment'
import {
  AlphaTemplate,
  StateTemplate,
  CheckpointTemplate
} from 'app/sessions/components/detail-alpha/index.component'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

@Injectable()
export class KernelService {
  constructor(private httpClient: HttpClient) {}

  getAlphas(): Observable<AlphaTemplate[]> {
    return this.httpClient
      .get<any[]>(`${urlEssenceKernel}/kernel`)
      .pipe(
        map(alphas =>
          alphas.map(x => new AlphaTemplate(x.id, x.name, x.area, this))
        )
      )
  }

  getStates(alphaId): Observable<StateTemplate[]> {
    return this.httpClient
      .get<any[]>(`${urlEssenceKernel}/kernel/alphas/${alphaId}`)
      .pipe(
        map(alphas =>
          alphas.map(x => new StateTemplate(x.id, x.name, x.previousId, this))
        )
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

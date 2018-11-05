import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { urlEssenceKernel } from '@env/environment'
import {
  Alpha,
  State,
  Checkpoint
} from 'app/sessions/components/setCurrentState/index.component'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'

@Injectable()
export class KernelService {
  constructor(private httpClient: HttpClient) {}

  getAlphas(): Observable<Alpha[]> {
    return this.httpClient
      .get<any[]>(`${urlEssenceKernel}/kernel`)
      .pipe(
        map(alphas => alphas.map(x => new Alpha(x.id, x.name, x.area, this)))
      )
  }

  getStates(alphaId): Observable<State[]> {
    return this.httpClient
      .get<any[]>(`${urlEssenceKernel}/kernel/alphas/${alphaId}`)
      .pipe(
        map(alphas =>
          alphas.map(x => new State(x.id, x.name, x.previousId, this))
        )
      )
  }

  getSchemaKernel() {
    return this.httpClient.get(`${urlEssenceKernel}/kernel/schema`)
  }

  getCheckpoints(stateId): Observable<Checkpoint[]> {
    return this.httpClient.get<Checkpoint[]>(
      `${urlEssenceKernel}/kernel/states/${stateId}/checkpoints`
    )
  }
}

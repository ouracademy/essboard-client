import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { urlEssenceKernel } from '@env/environment'
import {
  Alpha,
  State,
  Checkpoint
} from 'app/sessions/components/setCurrentState/index.component'
import { Observable } from 'rxjs/Observable'
import { pipe } from 'rxjs/internal/util/pipe';
import { map } from 'rxjs/operators/map'
@Injectable()
export class KernelService {
  constructor(private httpClient: HttpClient) {}

  getAlphas(): Observable<Alpha[]> {
    return pipe(
      this.httpClient.get<any[]>(`${urlEssenceKernel}/kernel`),
      map(alphas => alphas.map(x => new Alpha(...x, null))                                    
    )
  }

  getStates(alphaId): Observable<State[]> {
    return this.httpClient.get<any[]>(`${urlEssenceKernel}/kernel/alphas/${alphaId}`)
  }

  getSchemaKernel() {
    return this.httpClient.get(`${urlEssenceKernel}/kernel/schema`)
  }

  getCheckpoints(stateId): Observable<Checkpoint[]> {
    return this.httpClient.get(
      `${urlEssenceKernel}/kernel/states/${stateId}/checkpoints`
    )
  }

  getSchemaByTemplateId(templateId) {}
}

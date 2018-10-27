import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlEssenceKernel } from '@env/environment'
@Injectable()
export class KernelService {
    constructor(private httpClient: HttpClient) {
    }

    getAlphas() {
        return this.httpClient.get(`${urlEssenceKernel}/kernel`)
    }
    getStates(alphaId) {
        return this.httpClient.get(`${urlEssenceKernel}/kernel/${alphaId}`)
    }
}



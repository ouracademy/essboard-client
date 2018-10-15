import { Injectable } from '@angular/core';
import { AlphaMetadata } from '../../model/metadata/kernel';
@Injectable()
export class AlphaMockService {
    alphas :AlphaMetadata[] = [];
    constructor() {
    }

    getAlphaSummary(identifier: number) {

    }
    getAlphaComplete(identifier: number) {


    }
    addToAlphas(alphas){
        this.alphas = alphas;
    }

}
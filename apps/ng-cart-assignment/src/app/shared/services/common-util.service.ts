import { Injectable } from '@angular/core';
import { layoutConfig } from '../shared.config';

@Injectable()
export class CommonUtilService {
    getCardOptions(page: string): {classNames: string[]} {
        const options = {classNames: []};
        return layoutConfig.card[page] || options;
    }
}

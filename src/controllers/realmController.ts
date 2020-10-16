
import { AbstractController } from './abstractController.ts';
import RealmService from '../services/realmService.ts';

class RealmController extends AbstractController {
    constructor() {
        super('realm', new RealmService())
    }
}

export default RealmController;

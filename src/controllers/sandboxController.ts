
import { AbstractController } from './abstractController.ts';
import SandboxService from '../services/sandboxService.ts';

class SandboxController extends AbstractController {
    constructor() {
        super('sandbox', new SandboxService())
    }
}

export default SandboxController;

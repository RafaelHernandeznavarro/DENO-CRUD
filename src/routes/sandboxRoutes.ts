
import AbstractRoutes from "./abstractRoutes.ts";
import SandboxController from '../controllers/sandboxController.ts';

export default class SandboxRouter extends AbstractRoutes {
    constructor() {
        super('sandbox', new SandboxController())
    }
};

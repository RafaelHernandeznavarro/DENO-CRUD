
import AbstractRoutes from "./abstractRoutes.ts";
import SandboxController from '../controllers/sandboxController.ts';

export class SandboxRouter extends AbstractRoutes {
    constructor() {
        super('sandbox', new SandboxController())
    }
};

const sandboxInstance = new SandboxRouter();
export const sandboxRoutes = sandboxInstance.getRoutes();

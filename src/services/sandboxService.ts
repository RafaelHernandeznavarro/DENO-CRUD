import { AbstractService } from "./abstractService.ts";

class SandboxService extends AbstractService {
    constructor() {
        super("https://reqres.in/api/users")
    }
}

export default SandboxService;
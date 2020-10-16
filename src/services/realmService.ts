import { AbstractService } from "./abstractService.ts";

class RealmService extends AbstractService{
    constructor() {
        super("https://reqres.in/api/products")
    }
}

export default RealmService;
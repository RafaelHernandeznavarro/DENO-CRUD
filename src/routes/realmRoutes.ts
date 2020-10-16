
import AbstractRoutes from "./abstractRoutes.ts";
import RealmController from '../controllers/realmController.ts';

export default class RealmRouter extends AbstractRoutes {
    constructor() {
        super('realm', new RealmController())
    }
};

const realmInstance = new RealmRouter();
export const RealmRoutes = realmInstance.getRoutes();

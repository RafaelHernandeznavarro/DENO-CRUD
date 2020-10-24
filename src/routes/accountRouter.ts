
import { Router } from '../deps.ts';
import Constants from '../constants.ts';

import { AccountController } from '../controllers/accountController.ts';

export default class AccountRouter {

    private path: string = `${Constants.BASE_PATH}/account`;
    private controller = new AccountController('');
    private router: Router = new Router;

    constructor() { }

    public getRoutes = (): Router => {
        this.router.post(`${this.path}/login`, this.controller.loginUser);
        this.router.get(`${this.path}/login`, this.controller.loginView);
        this.router.get(`${this.path}/logout`, this.controller.logoutUser);
        return this.router;
    }

};

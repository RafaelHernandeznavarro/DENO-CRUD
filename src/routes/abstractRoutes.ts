
import { Router } from '../deps.ts';
import Constants from '../constants.ts';

export default class AbstractRoutes {

    private path: string;
    private controller: any;
    private router = new Router();

    constructor(path: string, controller: any) {
        this.path = `${Constants.BASE_PATH}/${path}`;
        this.controller = controller;
    }

    public getRoutes = () : Router => {
        this.router.post(`${this.path}/create`, this.controller.create),
        this.router.get(`${this.path}/read/:id`, this.controller.read),
        this.router.post(`${this.path}/update/:id`, this.controller.update),
        this.router.get(`${this.path}/delete/:id`, this.controller.delete),
        this.router.get(`${this.path}/list`, this.controller.list);
        return this.router;
    }

};

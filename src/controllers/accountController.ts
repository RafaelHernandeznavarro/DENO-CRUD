import { Request, Response } from '../deps.ts';
import RenderEngine from '../helpers/render.ts';

export class AccountController { 

    path: string;
    renderEngine: any;

    constructor(path: string) {
        this.path = path;
        this.renderEngine = new RenderEngine(path);
    }

    public render = async (response: Response, template: string, data?: any) => {
        console.log(template)
        const result = await this.renderEngine.render(template, data);
        console.log(result)
        response.body = result;
    }

    public loginView = async ( { response }: { response: Response } ) => {
        return this.render(response, 'login');
    }

    public loginUser = async ( { params, response }: { params: Record<string, any>, response: Response }) => {
        // const serviceData = await this.service.read(params.id);
        // return this.render(response, 'login');
        return response.redirect('/realm/list')
    } 

    public logoutUser = async ( { response }: { response: Response } ) => {
        return this.render(response, 'login');
    }

}

import { Request, Response } from '../deps.ts';
import RenderEngine from '../helpers/render.ts';

export class AbstractController { 

    path: string;
    service: any;
    renderEngine: any;

    constructor(path: string, service: any) {
        this.path = path;
        this.service = service;
        this.renderEngine = new RenderEngine(path);
    }

    private render = async (response: Response, template: string, data: any) => {
        const result = await this.renderEngine.render(template, data);
        response.body = result;
    }

    public create = async ( { response }: { response: Response } ) => {
        response.body = {
            path: this.path, 
        }
    }

    public read = async ( { params, response }: { params: Record<string, any>, response: Response }) => {
        const serviceData = await this.service.read(params.id);
        return this.render(response, 'raw', { data: JSON.stringify(serviceData) });
    } 

    public update = async ( { response }: { response: Response } ) => {
        response.body = {
            path: this.path, 
        }
    }

    public delete = async ( { request, response }: { request: Request, response: Response } ) => {
        const serviceData = await this.service.delete();
        response.redirect(`${request.url.origin}/${this.path}/list`);
    }

    public list = async ( { response }: { response: Response } ) => {
        const serviceData = await this.service.list();
        return this.render(response, 'list', { data: serviceData });
    }

}

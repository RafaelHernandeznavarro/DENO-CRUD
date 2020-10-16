import { Request, Response } from '../deps.ts';
import { Handlebars } from '../deps.ts';

export class AbstractController { 

    path: string;
    service: any;

    constructor(path: string, service: any) {
        this.path = path;
        this.service = service;
    }

    public render = async (response: Response, template: string, data: any) => {
        data.path = this.path;

        const DEFAULT_HANDLEBARS_CONFIG = {
            baseDir: Deno.cwd() + '/src/views',
            extname: '.hbs',
            layoutsDir: 'layouts/',
            partialsDir: 'partials/',
            defaultLayout: template,
            // helpers: undefined,
            helpers: {
                ternary: (opt1: any, opt2: any, accept: any, reject:any) => {
                    return (opt1 == opt2 ? accept : reject);
                }
            },
            compilerOptions: undefined
        };
        const handle = new Handlebars(DEFAULT_HANDLEBARS_CONFIG);
        const result: string = await handle.renderView('partials/index', data);

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

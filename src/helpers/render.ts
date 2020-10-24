import { Handlebars } from '../deps.ts';

export default class RenderEngine {

    private path;
    private DEFAULT_HANDLEBARS_CONFIG : any = {
        baseDir: Deno.cwd() + '/src/views',
        extname: '.hbs',
        layoutsDir: 'layouts/',
        partialsDir: 'partials/',
        helpers: {
            ternary: (opt1: any, opt2: any, accept: any, reject:any) => {
                return (opt1 == opt2 ? accept : reject);
            }
        },
        compilerOptions: undefined
    };
    
    constructor (path: string) {
        this.path = path;
    }
    
    public render = async (template: string, data: any = {}) => {
        this.DEFAULT_HANDLEBARS_CONFIG.defaultLayout = template;
        const handle = new Handlebars(this.DEFAULT_HANDLEBARS_CONFIG);

        data.path = this.path;
        const result: string = await handle.renderView('partials/index', data);
        return result;
    }

}

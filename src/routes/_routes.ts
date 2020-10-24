import { Context, Router, send } from '../deps.ts';
import RenderEngine from '../helpers/render.ts';

const routesNames = ['accountRouter', 'realmRoutes', 'sandboxRoutes'];

export default class Routes {

    private app;
    private router = new Router();
    private renderEngine: any;

    constructor(app: any) {
        this.app = app;
        this.renderEngine = new RenderEngine('account');
    }

    private serveStatics = (): void => {
        this.router.get("/static/(.*)", async (context: Context) => {
            await send(context, context.request.url.pathname, {
                root: `${Deno.cwd()}/`
            });
        });
    }

    private homeRoute = () => {
        // Default redirect to list
        this.router.get('', async (ctx: any) => {
            ctx.response.redirect('/account/login');
        });
    }

    private notFoundRoute = (): void => {
        this.router.get("/(.*)", async (context: Context) => {
            context.response.status = 404;
            const result = await this.renderEngine.render('notfound');
            context.response.body = result;
        });
    }

    private mainRoutes = () : Promise<any[]> => {
        let promises: Array<any> = [];

        routesNames.forEach(async (routeName) => {
            promises.push(import(`./${routeName}.ts`).then((routeImport: any) => {
                const routesInstance = new routeImport.default();
                const routesList = routesInstance.getRoutes();
                this.app.use(routesList.routes());
                this.app.use(routesList.allowedMethods());
            }));
        });

        return Promise.all(promises);
    };

    public load = async () => {
        await this.mainRoutes();
        this.serveStatics();
        this.homeRoute();
        this.notFoundRoute();
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
    }

}

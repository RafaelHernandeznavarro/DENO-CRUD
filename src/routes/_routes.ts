
export { sandboxRoutes } from './sandboxRoutes.ts';
export { RealmRoutes } from './realmRoutes.ts';


import { Router } from '../deps.ts';
export const defaultRouter = new Router();
// Default redirect to list
defaultRouter.get('', (ctx) => ctx.response.redirect('/realm/list'));

import { Application, log } from './deps.ts';
import Constants from "./constants.ts"
import { HTTP } from './helpers/http.ts'

const app = new Application()
app.use(new HTTP.Exceptions().catch);
app.use(new HTTP.Logger().requestCorrelation)
app.use(new HTTP.Logger().requestTimer);

import { defaultRouter, RealmRoutes, sandboxRoutes } from './routes/_routes.ts';
app.use(defaultRouter.routes());
app.use(RealmRoutes.routes());
app.use(RealmRoutes.allowedMethods());
app.use(sandboxRoutes.routes());
app.use(sandboxRoutes.allowedMethods());

log.info(`${Constants.APP_NAME} started on port ${Constants.PORT}.`)

await app.listen({ port: Constants.PORT })
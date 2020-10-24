import { Application, log } from './deps.ts';
import Constants from "./constants.ts"
import { HTTP } from './helpers/http.ts'

const app = new Application()

// Load middlewares
app.use(new HTTP.Exceptions().catch);
app.use(new HTTP.Logger().requestCorrelation)
app.use(new HTTP.Logger().requestTimer);

// Import Routes
import Routes from './routes/_routes.ts';
const routes = new Routes(app);
routes.load();

log.info(`${Constants.APP_NAME} started on port ${Constants.PORT}.`)

await app.listen({ port: Constants.PORT })
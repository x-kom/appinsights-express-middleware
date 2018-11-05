"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appInsights = require("applicationinsights");
const uuid = require("uuid");
const logger_1 = require("./logger");
exports.logger = (app, options) => {
    const key = options && options.key ? options.key : process.env.APPINSIGHTS_INSTRUMENTATIONKEY || '';
    const ai = appInsights.setup(key);
    if (options.disableAutoCollect) {
        ai
            .setAutoCollectPerformance(false)
            .setAutoCollectConsole(false)
            .setAutoCollectRequests(false)
            .setAutoCollectExceptions(false);
    }
    appInsights.start();
    const logger = new logger_1.Logger(appInsights.defaultClient);
    app.locals.logger = logger;
    app.locals.appInsights = ai;
    return (req, res, next) => {
        res.locals.logger = logger;
        res.locals.requestId = uuid.v4();
        exports.logRequest(req, res, next);
    };
};
exports.logRequest = (req, res, next, telemetryProperties) => {
    res.locals.logger.trackRequest(req, res, { requestId: res.locals.requestId }, telemetryProperties);
    next();
};
exports.logError = (err, req, res, next) => {
    res.locals.logger.traceError(err, '', {
        url: req.url,
        requestId: res.locals.requestId,
    });
    next(err);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(ai) {
        this.ai = ai;
        this.ai = ai;
    }
    traceInfo(message, properties) {
        this.ai.trackTrace({ message, severity: 1, properties });
    }
    traceError(error, message, properties) {
        this.ai.trackException({ exception: error, properties: Object.assign({}, properties, { message: message }) });
    }
    traceWarning(message, properties) {
        this.ai.trackTrace({ message, severity: 2, properties });
    }
    traceVerbose(message, properties) {
        this.ai.trackTrace({ message, severity: 0, properties });
    }
    traceCritical(message, properties) {
        this.ai.trackTrace({ message, severity: 4, properties });
    }
    trackEvent(name, properties) {
        this.ai.trackEvent({ name, properties });
    }
    trackMetric(name, value) {
        this.ai.trackMetric({ name, value });
    }
    trackRequest(req, res, properties, telemetryProperties) {
        this.ai.trackRequest(Object.assign({ name: `${req.method} ${req.path}`, url: req.url, duration: parseInt(res.get('X-Response-Time'), 10), source: req.ip, resultCode: (res.statusCode || 200).toString(), success: true, properties }, telemetryProperties));
    }
}
exports.Logger = Logger;

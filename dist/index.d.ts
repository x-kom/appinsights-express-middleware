/// <reference types="express" />
import * as appInsights from 'applicationinsights';
import * as express from 'express';
export interface AppInsightsExpressOptions {
    key?: string;
    disableAutoCollect?: boolean;
}
export declare const logger: (app: express.Application, options?: AppInsightsExpressOptions) => (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export declare const logRequest: (req: express.Request, res: express.Response, next: express.NextFunction, telemetryProperties?: Partial<appInsights.Contracts.RequestTelemetry>) => void;
export declare const logError: (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => void;

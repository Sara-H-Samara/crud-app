import { InjectionToken } from "@angular/core";

/**
 * The base URL of the backend API.
 *
 * An InjectionToken lets us inject a plain value (not a class) with DI.
 * The real value is provided once in `app.config.ts`, so no service
 * needs to hard-code "http://localhost:8080".
 */
export const API_URL = new InjectionToken<string>("API_URL");

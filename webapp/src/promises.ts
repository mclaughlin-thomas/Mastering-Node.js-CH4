import { ServerResponse } from "http";
import { promisify } from "util";
export const endPromise = promisify(ServerResponse.prototype.end) as(data: any) => Promise<void>;
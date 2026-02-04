declare module 'connect' {
  import type { IncomingMessage, ServerResponse } from 'http';

  export type NextHandleFunction = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void;

  export interface Server extends NodeJS.EventEmitter {
    /**
     * Utilize the given middleware `handle` to the given `route`,
     * defaulting to _/_. This "route" is the mount-point for the
     * middleware, when given a value other than _/_ the middleware
     * is only effective when that segment is present in the request's
     * pathname.
     *
     * For example if we were to mount a function at _/admin_, it would
     * be invoked on _/admin_, and _/admin/settings_, however it would
     * not be invoked for _/_, or _/posts_.
     */
    use(route: string, fn: NextHandleFunction): Server;
  }
}

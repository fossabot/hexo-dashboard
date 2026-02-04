import type { Server } from 'connect';

import { join, posix } from 'path';
import { randomBytes } from 'crypto';
import express from 'express';
import session from 'express-session';

import authMiddleware from './middlewares/auth';
import errorHandler from './middlewares/errorHandler';

import articleRoute from './routes/article';
import authRoute from './routes/auth';
import configRoute from './routes/config';
import taxonomyRoute from './routes/taxonomy';

hexo.extend.filter.register('server_middleware', function (app: Server) {
  const expressApp = express();
  const dist = join(__dirname, '../../client/dist');
  expressApp.set('trust proxy', 1);

  expressApp.use(express.static(dist));

  expressApp.use('/api', express.json());

  expressApp.use('/api', authMiddleware);
  expressApp.use('/api', session({
    secret: randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    },
  }));

  const router = express.Router();
  router.use('/articles', articleRoute(hexo));
  router.use('/auth', authRoute(hexo));
  router.use('/config', configRoute(hexo));
  router.use('/taxonomies', taxonomyRoute(hexo));
  expressApp.use('/api', router);

  expressApp.use('/api', errorHandler);

  expressApp.get('/{*path}', (_req, res) => {
    res.sendFile(join(dist, 'index.html'));
  });

  app.use(posix.join('/', hexo.config.root, 'dashboard'), expressApp);
});

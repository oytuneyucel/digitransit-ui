import config from '../config';
import { COMMIT_ID } from '../buildInfo';

const RavenLimiter = {};

function getRaven() {
  if (process.env.NODE_ENV === 'production') {
    /* eslint-disable global-require */
    const Raven = require('raven-js');
    Raven.addPlugin(require('raven-js/plugins/console'));
    /* eslint-enable global-require */

    Raven.config(config.SENTRY_DSN, {
      release: COMMIT_ID,
      stacktrace: true,
      shouldSendCallback: (data) => {
        if (data.message in RavenLimiter) {
          return false;
        }

        RavenLimiter[data.message] = true;

        setTimeout(() => {
          delete RavenLimiter[data.message];
        }, 60000);

        return true;
      },
    }).install();
    return Raven;
  }
  return {
    captureMessage: console.error, // eslint-disable-line no-console
  };
}

export default getRaven();

import "core-js/stable";
import "regenerator-runtime/runtime";
import Application from "./app";

const application = new Application();

/**
 * Boostrap Application Services
 * Eg: DB, Etc..
 */
application.boostrap().then(() => {
  /**
   * Listen app requests
   */
  application.listen();
});

export default application.app;

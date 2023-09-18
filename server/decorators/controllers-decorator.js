const { HttpError } = require("../utilities/index");

module.exports = controllerDecorator = (controller) => {
  const func = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (e) {
      const message = String(e.reason);
      next(HttpError(500, message));
    }
  };

  return func;
};

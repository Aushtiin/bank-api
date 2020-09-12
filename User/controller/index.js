const sendJSONResponse = (res, status, message, data) => {
  res.status(status);
  res.json({
    message,
    data,
  });
};

const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);

module.exports = {
  sendJSONResponse,
  catchErrors,
};

// function catchVrrors(fn) {
//   return function (req, res, next) {
//     return fn(req, res, next).catch(next);
//   };
// }

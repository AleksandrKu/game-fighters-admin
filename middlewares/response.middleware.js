const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) res.status(400).send({ error: true,  message: res.err });
  if (res.data) res.status(200).send(res.data);
  next();
};

exports.responseMiddleware = responseMiddleware;

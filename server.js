const app = require("./config/express");

const routes = [
  { path: "/user", router: require("./router/usersRouter") },
  { path: "/reactions", router: require("./router/reactionsRouter") },
  { path: "/posts", router: require("./router/postsRouter") },
  { path: "/reports", router: require("./router/reportsRouter") },
];

for (const route of routes) {
  app.use(route.path, route.router);
}

app.use((error, req, res, next) => {
  statusCode = req.statusCode || 500;
  if (statusCode === 500) {
    /* istanbul ignore next */
    console.log(error.toString());
  }
  res.status(statusCode).json({
    success: false,
    data: {
      message: error.toString(),
    },
  });
});

app.listen(3001, () => {
  console.log(`Application running in mode`, {
    port: 3001,
    url: `http://localhost:3001`,
  });
});

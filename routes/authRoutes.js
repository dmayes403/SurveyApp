const passport = require("passport");
// ^^ this requires in the original passport node module

module.exports = app => {
    //^^ this exports the next two functions and calls it with the app object
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
      // specifies what info we want from google about the user
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));
  // ^^ this is different this time because there is a 'code' on the url

  // app.get('/', (req, res) => {
  //     res.send({ hi: 'hey johnny!' });
  // })
  // ^^ this creates a new route handler that is watching for http requests.
  // we also have available get, put, post, patch, delete.
  // Res is what's being sent back to the front end
};
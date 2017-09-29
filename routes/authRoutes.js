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

  app.get(
      "/auth/google/callback", 
      passport.authenticate("google"),
      (req, res) => {
          res.redirect('/surveys');
      }
    );
  // ^^ this is different this time because there is a 'code' on the url


  app.get('/api/logout', (req, res) => {
      req.logout();
      // ^^ this is a function that is automatically attached to the request object by passport.
      // It wipes out the cookie
    //   res.send(req.user);
      // ^^ this proves to the user that they are no longer logged in
      res.redirect('/')
  })

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    // ^^ current user data is sent on login
  })
};

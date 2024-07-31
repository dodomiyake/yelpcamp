const User = require("../model/user");

module.exports.registerForm = (req, res) => {
    res.render("user/register");
  }


module.exports.registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, err => {
        if(err) return next (err);
        req.flash("success", `Welcome to YelpCamp Campground, ${username}!`);
        res.redirect("/campgrounds");    
      })
      } catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
  }

module.exports.loginForm = (req, res) => {
    res.render('user/login')
}

module.exports.loginUser = (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back, ${username}!`);
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
}
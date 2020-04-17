const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
// const post = require(__dirname + "/post.js");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

/* use ejs instead of html to display web page */
app.set('view engine', 'ejs');

/* use bodyParser to parse through submitted form content */
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

/* creating a array to store all the posts */
const posts = []

/* Home page content */
app.get("/", (req, res) => {


  res.render("home", {
    startContent: homeStartingContent,
    newPosts: posts
  });
});


/* About page content */
app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  });
});


/* Contact page content */
app.get("/contact", (req, res) => {
  res.render("contact", {
    contactPageContent: contactContent
  });
});

/* Compose page content */
app.get("/compose", (req, res) => {
  res.render("compose");
});

/* POST action to compose page */
app.post("/compose", (req, res) => {

  class Post {
    constructor(title, content) {
      this.title = title;
      this.content = content;
    }
  };



  const post = new Post(req.body.postTitle, req.body.postBody);

  posts.push(post);

  res.redirect("/");


});

app.get("/post/:postName", (req, res) => {

  const postName = _.kebabCase(req.params.postName);

  posts.forEach((post) => {
    if (_.kebabCase(post.title) === postName) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });

    } else {

    }
  });

});


/* setting up port listening to enable node js server. */
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});

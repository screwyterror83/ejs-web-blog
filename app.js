const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


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

const dbName = "webBlogDB";

/*  1. connect to DB server, create new DB 
    2. create schema for documents
    3. create DB model using created schema.
*/
mongoose.connect(
  "mongodb+srv://admin-darren:Mongodb382%23@cluster0-gmncq.mongodb.net/" +
  dbName, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

const postSchema = new mongoose.Schema({
  topic: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema)

/* Home page content */
app.get("/", (req, res) => {

  Post.find({}, (err, foundPost) => {
      if (err) {
        console.log(err);
      } else if (foundPost) {
        console.log(foundPost)
        res.render("home", {
          startContent: homeStartingContent,
          newPosts: foundPost,
        });
      }
    }

  );
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


  console.log(req.body.postTitle)
  console.log(req.body.postBody)

  const post = new Post({
    topic: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", (req, res) => {

  console.log(req.params)
  const reqPostId = req.params.postId;

  Post.findOne(
    {
      _id: reqPostId,
    },
    (err, foundPost) => {
      if (!err) {
          res.render("post", {
            title: foundPost.topic,
            content: foundPost.content,
          });
        } else {
          res.redirect("/");
        }
      }
  );
})





let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
};

/* setting up port listening to enable node js server. */
app.listen(port, () => {
  console.log("Server started on port 3000");
});

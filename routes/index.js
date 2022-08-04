var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "Hello World!",
    user: "Charles",
    added: "1/8/2022(Mon)14:52:46",
  },
  {
    text: "Hi there!",
    user: "Amando",
    added: "3/8/2022(Thu)17:22:31",
  },
];

const getDayText = (date) => {
  let day = "";
  switch (date) {
    case 1:
      day = "(Mon)";
      break;
    case 2:
      day = "(Tue)";
      break;
    case 3:
      day = "(Wed)";
      break;
    case 4:
      day = "(Thu)";
      break;
    case 5:
      day = "(Fri)";
      break;
    case 6:
      day = "(Sat)";
      break;
    case 7:
      day = "(Sun)";
  }
  return day;
};

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};

const getTime = (date) => {
  let h = addZero(date.getHours());
  let m = addZero(date.getMinutes());
  let s = addZero(date.getSeconds());
  let time = h + ":" + m + ":" + s;
  return time;
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Message Board", messages: messages });
});
/* GET new post page */
router.get("/new", function (req, res, next) {
  res.render("form", { title: "Mini Message Board" });
});
/* POST new post */
router.post("/new", function (req, res, next) {
  let date = new Date();
  let dayText = getDayText(date.getUTCDay());
  let month = date.getMonth() + 1;
  let userName = req.body.name;
  if (userName.length === 0) {
    userName = "Unsigned";
  }
  let formattedDate =
    date.getUTCDate() +
    "/" +
    month +
    "/" +
    date.getUTCFullYear() +
    dayText +
    getTime(date);
  messages.push({
    text: req.body.message,
    user: userName,
    added: formattedDate,
  });
  res.redirect("/");
});

module.exports = router;

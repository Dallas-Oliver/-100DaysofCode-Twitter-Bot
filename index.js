const Twit = require("twit");
const config = require("./config");
const T = Twit(config);

const track = {
  track: ["#100DaysofCode", "#javscript", "#frontend"]
};

const stream = T.stream("statuses/filter", track);
stream.on("tweet", tweeted);

function tweeted(eventMessage) {
  console.log(eventMessage.user.screen_name, eventMessage.text);

  tweet(eventMessage.id_str);
}

function tweet(tweet_id) {
  function callback(err, data, res) {
    console.log("the bot is running");
  }

  T.post("statuses/retweet/:id", { id: tweet_id }, callback);
}

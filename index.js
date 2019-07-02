const Twit = require("twit");
const config = require("./config");
const database = require("nedb");
const T = Twit(config);

const track = {
  track: "#100DaysofCode"
};

const stream = T.stream("statuses/filter", track);
stream.on("tweet", tweeted);

function tweeted(eventMessage) {
  console.log(eventMessage.id, eventMessage);
  tweet(eventMessage.id_str);
}

function tweet(tweet_id) {
  function callback(err, data, res) {
    console.log("the bot is running", data);
  }

  T.post("statuses/retweet/:id", { id: tweet_id }, callback);
}

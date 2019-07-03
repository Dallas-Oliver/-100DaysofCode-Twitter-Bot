const Twit = require("twit");
const config = require("./config");
const T = Twit(config);

//hashtags that when tweeted by some user, will trigger the bot to retweet that status
const track = {
  track: ["#100DaysofCode", "#javscript", "#frontend"]
};

//stream that 'listens' for tweets containing one or more of the assiciated hashtag tracks and calls the tweeted callback function
const stream = T.stream("statuses/filter", track);
stream.on("tweet", tweeted);

//function that receives the eventmessage containg all meta-data from the tweet and passes the id string to the Twit POST method tweet
function tweeted(eventMessage) {
  console.log(eventMessage.user.screen_name, eventMessage.text);

  tweet(eventMessage.id_str);
}

//function that receives the id string from the status passed from the tweeted function and uses it to retweet that status to our own twitter account
function tweet(tweet_id) {
  function callback(err, data, res) {
    console.log("the bot is running");
  }

  T.post("statuses/retweet/:id", { id: tweet_id }, callback);
}

///planning on adding functionality to "Like" and auto comment something(emoji, words of encouragement) on #100DaysofCode statuses

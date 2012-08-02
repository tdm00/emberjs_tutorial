/**************************
* Application
**************************/
App = Em.Application.create();

/**************************
* Models
**************************/
App.Tweet = Em.Object.extend({
  avatar: null,
  screen_name: null,
  text: null,
  date: null
});

/**************************
* Views
**************************/
App.SearchTextField = Em.TextField.extend({
  insertNewline: function() {
    App.tweetsController.loadTweets();
  }
});

/**************************
* Controllers
**************************/
App.tweetsController = Em.ArrayController.create({
  content: [],
  username: '',
  loadTweets: function() {
    var me = this;
    var username = me.get("username");
    console.log(username);
    if ( username ) {
      var url = 'http://api.twitter.com/1/statuses/user_timeline.json'
          url += '?screen_name=%@&classback=?'.fmt(me.get("username"));
      // Output to console the url used for the call to Twitter
      console.log(url);
      // push username to recent user array
      App.recentUsersControler.addUser(username);
    }
  }
});

App.recentUsersController = Em.ArrayController.create({
  content: [],
  addUser: function(name) {
    if ( this.contains(name) ) this.removeObject(name);
    this.pushObject(name);
  },
  removeUser: function(view) {
    console.log(view.context);
    this.removeObject(view.context);
  },
  searchAgain: function(view) {
    App.tweetsController.set('username', view.context);
    App.tweetsController.loadTweets;
  },
  reverse: function() {
    return this.toArray().reverse();
  }.property('@each')
});

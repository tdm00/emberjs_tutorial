/**************************
* Application
**************************/
App = Em.Application.create();

/**************************
* Models
**************************/

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
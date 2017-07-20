
$(document).ready(() => {
  function LoadPoll() { // gets our tweets from the /tweets page.
    $.ajax({
      url: '/create',
      method: 'GET',
      success: renderTweets,
    });
  }
  LoadPoll();

  function renderTweets(tweets) {
    for (tweet in tweets) {
      // calls createPollElement for each tweet
      const tweetData = tweets[tweet];
      const $tweet = createPollElement(tweetData);
      // takes return value and appends it to the tweets container
      $('#other-tweets').prepend($tweet); // prepend makes the tweet appear at the top
    }
  }

  function createPollElement(tweet) {
    const $tweet = `<article class="tweet-container">
                  <header class="tweet">
                    <img class="avatars" src="${tweet.user.avatars.small}">
                    <h2> ${tweet.user.name} </h2>
                    <h6 class ="profile-name"> ${tweet.user.handle} </h6>
                  </header>
                    <div class="content-holder"> <div class="content">${escape(tweet.content.text)}</div> </div>
                  <footer>${moment(tweet.created_at).fromNow()}</footer>
                </article>`;

                // used moment from Now by downloading moment.js file to vendor(front-end). this was done inorder to convert
                //number of milliseconds given in created_at to (1 hour ago).

    return $tweet;
  }

  function dataCheck(data) { // helper function
    if ((data === '') || (data === null)) {
      alert('Please enter text');
      return false;
    }
    return true;
  }


  $('.form-content').on('submit', function (event) {
    event.preventDefault(); // prevents the page from going to /tweets
    const pollItemTitle = $(this).find('.item title').val(); // this will give us the actual value of data not serialize the data
    const pollItemDescrip = $(this).find('.item descrip').val();
    if (dataCheck(pollItemTitle) && (dataCheck(pollItemDescrip))) { // Will call the function to run, if return true do this
      $.ajax({
        url: '/admin',
        method: 'POST',
        data: $(this).serialize(), // the data from the tweets
        // on success pass the function loadtweetz
        success: () => {                // ES6 function does not change the value of this which refers to the form.
          $('#other-tweets').empty();      //otherwise normal function would change this to refer to the function itself
          loadTweets();
          $(this).find('textarea').val(''); // this will clear the form after the new tweet is created.
        },
      });
    }
  });

  $('button').on('click', () => {
    $('.new-tweet').slideToggle(750);
    $('textarea').focus();
  });
});


// This function makes malicious javascript as text from the user to a string so if its malicious doesnt affect our app.
function escape(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

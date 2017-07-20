// let polls = item1 = "Wonder woman"
//             descrip =
//             item2 = "Guardians of Galaxy"
//             descrip =
//             item3 = "Spiderman"
//             descrip =

// let poll = item3 = "Spiderman"
//            descrip =


// $(document).ready(() => {
//   function LoadPoll() { // gets our tweets from the /tweets page.
//     $.ajax({
//       url: '/create',
//       method: 'GET',
//       success: renderPolls,
//     });
//   }
//   LoadPoll();

//   function renderPolls(polls) {
//     for (poll in polls) {
//       // calls createPollElement for each tweet
//       const pollData = polls[poll];
//       const $poll = createPollElement(pollData);
//       // takes return value and appends it to the tweets container
//       $('.poll-container').append($poll); // prepend makes the tweet appear at the top
//     }
//   }

//   function createPollElement(poll) {
//     const $poll = `<ul class = "poll-list">
//                    <li>${poll.item} </li>`

//     return $poll;
//   }

//   function dataCheck(data) { // helper function
//     if ((data === '') || (data === null)) {
//       alert('Please enter text');
//       return false;
//     }
//     return true;
//   }


//   $('.form-content').on('submit', function (event) {
//     event.preventDefault(); // prevents the page from going to /tweets
//     const pollItemTitle = $(this).find('.item title').val(); // this will give us the actual value of data not serialize the data
//     if (dataCheck(pollItemTitle) ) { // Will call the function to run, if return true do this
//       $.ajax({
//         url: '/admin',
//         method: 'POST',
//         data: $(this).serialize(), // the data from the tweets
//         // on success pass the function loadtweetz
//         success: () => {                // ES6 function does not change the value of this which refers to the form.
//           $('.poll-container').empty();      //otherwise normal function would change this to refer to the function itself
//           loadTweets();                     // empty clears the tweets so no duplication is there
//           $(this).find('textarea').val(''); // this will clear the form after the new tweet is created.
//         },
//       });
//     }
//   });

  $("#create-new").on("click", () => {
    $("#form-content").slideToggle(750);
  });

  $(".edit").on("click", () => {
    $(".item").slideToggle(750);
  });






// // This function makes malicious javascript as text from the user to a string so if its malicious doesnt affect our app.
// function escape(str) {
//   const div = document.createElement('div');
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// }

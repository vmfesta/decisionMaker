
//var borda = require( path.resolve( __dirname, "./borda-count.js" ) );


let id;
let countVotes = {};
let options;
var winner = undefined;

function calculateVotes(votes) {
  maxScore = votes[0].length;
  for (var key in votes) {
    if (votes.hasOwnProperty(key)) {
      var voter = votes[key];
      for (var i = 0; i < voter.length; i++) {
        if (countVotes[voter[i]]) {
          countVotes[voter[i]] += maxScore - i;
        } else {
          countVotes[voter[i]] = maxScore - i;
        }
      }
    }
  }
  //});
  //   _.each(votes, voter => {
  //     for (var i = 0; i < voter.length; i++) {
  //       if (countVotes[voter[i]]) {
  //         countVotes[voter[i]] += maxScore - i;
  //       } else {
  //         countVotes[voter[i]] = maxScore - i;
  //       }
  //     }
  //   });
  checkWinner();
}

function checkWinner() {
  let aux = 0;
    //console.log(countVotes);
  for (var op in countVotes) {
    if (countVotes.hasOwnProperty(op)) {
      var option = countVotes[op];
      //if (_.isUndefined(winner)) {
      debugger;
        if (!winner) {
        winner = op;
        aux = option;
      }
      if (aux < option) {
        winner = op;
        aux = option;
      }
    }
  }
  return winner;
}


$(document).ready(() => {
  let url = $("h3").attr("id");
  console.log(url);
  $.ajax({
    method: "GET",
    url: `/api/result/data/${url}`,
    dataType: "json",
    error: err => {
      console.log(err);
    },
    success: data => {
      //console.log(data.votes);

      $(`h3`).text(data.decisionTitle);
      for (var i = 0; i < 3; i++) {
        $("#op" + Number(i + 1)).replaceWith(data.optionsTitle[i]);
        $("#opv" + Number(i + 1)).replaceWith(data.optionsTitle[i]);
        $(".description" + Number(i + 1)).text(data.optionsDesc[i]);
        id = data.decisionId;
        options = data.optionsTitle;
      }
      $.ajax({
        method: "GET",
        url: `/api/result/votes/${id}`,
        dataType: "json",
        error: err => {
          console.log(err);
        },
        success: data => {
          var votes = [];
          for (var i = 0; i < data.length; i++) {
            let aux = data[i].votes.split(',');
            votes.push(aux);
          }
          calculateVotes(votes);
          console.log(options[Number(winner)]);
        }
      });
    }
  });
});

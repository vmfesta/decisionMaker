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
  checkWinner();
}

function checkWinner() {
  let aux = 0;
  for (var op in countVotes) {
    if (countVotes.hasOwnProperty(op)) {
      var option = countVotes[op];
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
  $.ajax({
    method: "GET",
    url: `/api/result/data/${url}`,
    dataType: "json",
    error: err => {
      console.log(err);
    },
    success: data => {
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
          $("#finalResult").text(options[Number(winner - 1)]);
        }
      });
    }
  });
});

var _ = require("underscore");

const votes = {
  victor: [2, 1, 3],
  kevin: [2, 1, 3],
  ayesha: [2, 3, 1],
  marcos: [3, 2, 1]
};

let countVotes = {};

var winner = undefined;

function calculeVotes(votes) {
  maxScore = Object.keys(votes).length - 1;
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
    console.log(countVotes);
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
calculeVotes(votes);
console.log(winner);
module.exports = {
  calculeVotes
};

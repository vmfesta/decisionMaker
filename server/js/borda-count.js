var _ = require("underscore")

const votes = {
    victor: [2, 1, 3],
    kevin:  [2, 1, 3],
    ayesha: [2, 3, 1],
    marcos: [3, 2, 1]
}

let countVotes = {};

var winner;

function calculeVotes() {
    maxScore = Object.keys(votes).length -1 ;
    _.each(votes, (voter) => {
       for (var i = 0; i < voter.length; i++) {
            if(countVotes[voter[i]]) {
                countVotes[voter[i]] += maxScore - i;
            } else {
                countVotes[voter[i]] = maxScore - i;
            }
        }
    });
}

function checkWinner() {
    let aux = 0;

    for (var op in countVotes) {
        if (countVotes.hasOwnProperty(op)) {
            var option = countVotes[op];   
            if(_.isUndefined(winner)) {
                winner = op;
                aux = option
            }
            if(aux < option) {
                winner = op;
                aux = option
            }
        }
    }
}



calculeVotes();
checkWinner();
console.log(winner);

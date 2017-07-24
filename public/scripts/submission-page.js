let voteOrder = [];

$(document).ready(function() {
  function init() {
    $(".draggable").draggable({});
    $(".droppable").droppable({
      drop: handleDropEvent
    });
  }

  function handleDropEvent(event, ui) {
    var draggable = ui.draggable.attr("id");
    var div = event.target.innerHTML;
    let position;
    if (div.indexOf("1") > 0) {
      position = 1;
    } else if (div.indexOf("2") > 0) {
      position = 2;
    } else if (div.indexOf("3") > 0) {
      position = 3;
    } else if (div.indexOf("4") > 0) {
      position = 4;
    } else if (div.indexOf("5") > 0) {
      position = 5;
    }
    voteOrder[position - 1] = draggable;
  }

  init();

  $("#votebutton").click(() => {
    voteOrder.push($(".dTitle").attr("id"));
    $.ajax({
      type: "POST",
      url: `/api/submission/save/${voteOrder.toString()}`,
      error: err => {
        console.log(err);
      },
      success: data => {}
    });
    alert("Vote submitted!");
    $("#votebutton").remove();
  });

  $(document).ready(() => {
    let url = $(".dTitle").attr("id");
    $.ajax({
      method: "GET",
      url: `/api/result/data/${url}`,
      dataType: "json",
      error: err => {
        console.log(err);
      },
      success: data => {
        $(".dTitle").text(data.decisionTitle);
        for (var i = 0; i < 3; i++) {
          $("#op" + Number(i + 1)).replaceWith(data.optionsTitle[i]);
          $("#desc" + Number(i + 1)).text(data.optionsDesc[i]);
        }
      }
    });
  });
});

$(document).ready(() => {
  let url = $("h3").attr("class");
  console.log(url);
  $.ajax({
    method: "GET",
    url: `/api/admin/data/${url}`,
    dataType: "json",
    error: err => {
      console.log(err);
    },
    success: data => {
      console.log(data);
      console.log(data.optionsTitle[0]);
      $("h3").text(data.decisionTitle);
      for (var i = 0; i < data.optionsTitle.length; i++) {
        if (i > 2) {
          $(".poll-list").append(`          <li class="item" id="item${i + 1}"></li>
          <p class="desc${i + 1}">Description</p>
          <div>
            <button class="edit" type="Edit">Edit</button>
            <button class="delete" type="Delete">Delete</button>
          </div>
          <textarea class="item-title${i + 1}" name="text" placeholder="Item"></textarea>
          <textarea class="item-descrip${i + 1}" name="text" placeholder="Description"></textarea>
          <div>
            <input id="${i + 1}" class="update" type="submit" value="Save">`);
        }
        $("#item" + Number(i + 1)).replaceWith(
          `<li class="item" id="item${i + 1}">${data.optionsTitle[i]}</li>`
        );
        $(".desc" + Number(i + 1)).text(data.optionsDesc[i]);
      }
    }
  });
});

$(document).ready(() => {
  $(".update").click(event => {
    event.preventDefault();
    const id = $(event.target).attr("id");
    let li = $("#item1")[0].innerText;
    const info =
      $("h3").attr("class") +
      "," +
      $(".item-title" + id).val() +
      "," +
      $(".item-descrip" + id).val() +
      "," +
      li +
      "," +
      $(".desc" + id).text();
    console.log(info);
    $.ajax({
      method: "POST",
      url: `/api/admin/update/${info}`,
      error: err => {
        console.log(err);
      },
      success: () => {
        alert("sucess");
      }
    });
  });
});

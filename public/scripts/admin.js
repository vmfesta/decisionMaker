$(document).ready(() => {
  let url = $("h3").attr('class');
  console.log(url);
  $.ajax({
    method: "GET",
    url: `/api/admin/data/${url}`,
    dataType: 'json',
    success: (data) => {
      alert("uhu");
    },
    error: (err) => {
      console.log(err);
    }
  // $("#tile").text(decisionTitle);
  // $(".TitleDescription").text(decisionDesc);
  });
});

$(document).ready(() => {
  console.log(url);
  $.ajax({
    method: "POST",
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

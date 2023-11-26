$(document).ready(function () {
    $("#addReservation").click(function (event) {
      event.preventDefault();
      var formData = $(".formInput").serialize();
  
      $.ajax({
        type: "POST",
        url: "/api/addBooking",
        data: formData,
        success: function (response) {
          console.log(response);
        },
        error: function (error) {
          console.error(error);
        },
      });
    });
  });
  
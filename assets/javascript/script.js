
$(document).ready(function () {
  var inputYear = $(".inputYear");
  var inputMonth = $(".inputMonth");
  var inputDay = $(".inputDay");
  var formInputs = $(".formInputs");
  var dateInputs = $("#day, #month, #year");

  

  function addWarningMessage(input, message) {
    if (!input.has(".pWarning").length) {
      input.append("<p class='pWarning'>" + message + "</p>");
      input.find("label").addClass("labelWarning");
      input.find("input").addClass("inputWarning");
    }
  }
  function addWarningInput(input) {
    if (!input.has(".pWarning").length) {
      input.find("label").addClass("labelWarning");
      input.find("input").addClass("inputWarning");
    }
  }

  $("#ageCalculator").submit(function (e) {
    e.preventDefault(); // prevent the form from submitting

    var day = parseInt($("#day").val());
    var month = parseInt($("#month").val());
    var year = parseInt($("#year").val());

    var today = new Date();

    // get the current year, month and day
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth();
    var currentDay = today.getDate();

    // create a new Date object with the user input (using 0 for the day value)
    var date = new Date(year, month - 1, 0);

    // get the last day of the month from the Date object
    var lastDayOfMonth = date.getDate();

    var diff = today - new Date(year, month - 1, day);


    // Check year input
    if (isNaN(year) && isNaN(month) && isNaN(day)) {
      addWarningMessage(inputYear, "This field is required");
      addWarningMessage(inputMonth, "This field is required");
      addWarningMessage(inputDay, "This field is required");
      $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
      return;
    };
    
    if (year > currentYear) {
      addWarningMessage(inputYear, "Must be in the past");
      addWarningInput(inputMonth);
      addWarningInput(inputDay);
      $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
      return;
    }; 
    
      var diff_years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
      if (diff_years < 0) {
        $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
      } else {
        $(".yearCalc span").text(diff_years);
      }

    // Check month input
    if (month - 1 > currentMonth && year > currentYear) {
      addWarningMessage(inputMonth, "Most be a valid month");
      $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
      return;
    };

      var diff_months = Math.floor(diff / (30.44 * 24 * 60 * 60 * 1000));
      if (diff_months - 1 < 0 && diff_months - 1 > -1) { 
        $(".monthsCalc span").text(diff_months);
      } else if (diff_months - 1 < -1) {
        addWarningInput(inputDay);
        addWarningMessage(inputMonth, "Most be a valid month");
        addWarningInput(inputYear);
        $(".monthsCalc span").text("--");
      } else {
        $(".monthsCalc span").text(diff_months);
      }
    

    // Check day input
    
    if (day < 1 || day > lastDayOfMonth) {
      addWarningMessage(inputDay, "Must be a valid day");
      addWarningInput(inputMonth);
      addWarningInput(inputYear);
      $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
      return;
    } 
    
    var diff_days = Math.floor(diff / (24 * 60 * 60 * 1000)); // divide by number of milliseconds in a day
    if(diff_days < 0) {
      addWarningMessage(inputDay, "Must be a valid day");
      addWarningInput(inputMonth);
      addWarningInput(inputYear);
      $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
    } else {
      $(".daysCalc span").text(diff_days);
    }


  });

    $(formInputs).click(function () {
      $(formInputs).find(".pWarning").remove();
      $(formInputs).find("label").removeClass("labelWarning");
      $(formInputs).find("input").removeClass("inputWarning");
    });


  // add focus event listeners to each input
  $(dateInputs).each(function () {
    $(this).focus(function () {
      $(this).siblings(".pWarning").remove();
      $(this).siblings("label").removeClass("labelWarning");
      $(this).removeClass("inputWarning");
    });
  });
});

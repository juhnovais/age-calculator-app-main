$(document).ready(function () {
  var inputYear = $(".inputYear");
  var inputMonth = $(".inputMonth");
  var inputDay = $(".inputDay");
  var formInputs = $(".formInputs");
  var dateInputs = $("#day, #month, #year");

  const addWarningMessage = (input, message) => {
    if (!input.has(".pWarning").length) {
      input.append("<p class='pWarning'>" + message + "</p>");
      input.find("label").addClass("labelWarning");
      input.find("input").addClass("inputWarning");
    }
  };
  function addWarningInput(input) {
    if (!input.has(".pWarning").length) {
      input.find("label").addClass("labelWarning");
      input.find("input").addClass("inputWarning");
    }
  }

  $("#ageCalculator").submit(function (e) {
    e.preventDefault(); // prevent the form from submitting

    var dayVal = parseInt($("#day").val());
    var monthVal = parseInt($("#month").val() - 1);
    var yearVal = parseInt($("#year").val());

    const isValidDate = (year, month, day) => {
      var d = new Date(year, month, day);
      var td = new Date();

      var diff = td - new Date(year, month, day);

      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        addWarningMessage(inputYear, "This field is required");
        addWarningMessage(inputMonth, "This field is required");
        addWarningMessage(inputDay, "This field is required");
        $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
        return;
      }

      if (
        d.getFullYear() == year &&
        year <= td.getFullYear() &&
        d.getMonth() == month &&
        d.getDate() == day
      ) {
        

        // calculate years, months and days
        var diff_years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
        var diff_months = Math.floor(diff / (30.44 * 24 * 60 * 60 * 1000));
        var diff_days = Math.floor(diff / (24 * 60 * 60 * 1000));
        if(diff > 0 ) {
            $(".yearCalc span").text(diff_years);
            $(".monthsCalc span").text(diff_months);
            $(".daysCalc span").text(diff_days); 
        } else {

          $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");

        }

        return;
      } else {
        
        
        if (d.getDate() != day || diff_days < 0) {
          addWarningMessage(inputDay, "Must be a valid day");
          $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
        }
        if (d.getMonth() != month || diff_months < 0) {
          addWarningMessage(inputMonth, "Most be a valid month");
          $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
        }
        if (year > td.getFullYear() || diff_years < 0) {
          addWarningMessage(inputYear, "Must be in the past");
          $(".monthsCalc span, .daysCalc span, .yearCalc span").text("--");
        }

        return;
      }
    };

    isValidDate(yearVal, monthVal, dayVal);

    
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

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = new Month(2018, 9); // October 2018
let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
document.addEventListener('DOMContentLoaded', function (event) {
  //console.log("inside DOMContentLoaded");
  updateCalendar();
  updateEvents();
}, false);

// function to clear calendar and change month and year header when clicking next or previous button
function updateCalendar() {
  document.getElementById('MonthHeader').innerHTML = months[currentMonth.month];
  document.getElementById('YearHeader').innerHTML = currentMonth.year;
  var weeks = currentMonth.getWeeks();
  let calendar = document.getElementById('tb_calendar');
  calendar.innerHTML = "";
  // create a new row for each week
  for (var w in weeks) {
    let thisWeek = document.createElement('tr');
    var days = weeks[w].getDates();
    // days contains normal JavaScript Date objects by creating a new cell for each day
    for (var d in days) {
      var today = document.createElement('td');
      // making the cells which have dates not belonging to the month blank
      if (days[d].getMonth() != currentMonth.month) {
        today.appendChild(document.createTextNode(" "));
      }
      else {
        // populating each cell with info from days array
        today.setAttribute("id", "day" + days[d].getDate())
        today.appendChild(document.createTextNode(days[d].getDate()));
      }
      thisWeek.appendChild(today);
      // You can see console.log() output in your JavaScript debugging tool, like Firebug,
      // WebWit Inspector, or Dragonfly.
    }
    calendar.appendChild(thisWeek);
  }
}

function updateEvents() {
  const year = currentMonth.year;
  const month = currentMonth.month + 1;
  //const tag = document.getElementById("edit_tag"+event_id).value;
  const dataString = { 'year': year, 'month': month };
  fetch("event.php", {
    method: 'POST',
    body: JSON.stringify(dataString),
    headers: { 'content-type': 'application/json' }
  })
    .then(response => response.json())
    .then(function (results) {
      //console.log(results)
      for (i in results) {
        day = results[i].day;
        time = results[i].time;
        document.getElementById("day" + day).innerHTML += "<br /> Name: " + results[i].name + "<br /> Time: " + results[i].time + "<br /> --------- <br />";
      }
    })
    .catch(error => console.log("error" + error));
}

// functionality for next month button
function nextMonth(currentDate) {
  currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
    // change year when month is January
  document.getElementById('YearHeader').innerHTML = currentMonth.year;
}

// functionality for previous month button
function prevMonth(currentDate) {
  currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
  // changing month and year in header
  document.getElementById('YearHeader').innerHTML = currentMonth.year;
}

$(function () {
  $("#nextbutton").on("click", () => {
    nextMonth();
    updateCalendar();
    updateEvents();
  })
  $("#previousbutton").on("click", () => {
    prevMonth();
    updateCalendar();
    updateEvents();
  })
})
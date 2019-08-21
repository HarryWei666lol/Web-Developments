function loginAjax(event) {
    const username = document.getElementById("usernamemain").value; // Get the username from the form
    const password = document.getElementById("passwordmain").value; // Get the password from the form
    // Make a URL-encoded string for passing json_obj data:
    console.log(username + "u p" + password)
    const data = { 'username': username, 'password': password };
    fetch("login.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            data.success ? console.log("You've been logged in!") : console.log("You were not logged in" + data.message);
            updateEvents();
        })
        .catch(error => console.log("error" + error));
}

document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click


function registerAjax(event) {
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form
    const repass = document.getElementById("repass").value; // Get the repass from the form
    // Make a URL-encoded string for passing json_obj data:
    const data = { 'username': username, 'password': password, 'repass': repass };
    console.log(data);
    fetch("register.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => console.log(data.success ? "You've been registered!" : `You were not registered ${data.message}`));
}

document.getElementById("register_btn").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click



function logoutAjax(event) {
    const username = document.getElementById("usernamemain").value; // Get the username from the form
    const password = document.getElementById("passwordmain").value; // Get the password from the form
    console.log(username + "u p" + password)
    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };
    fetch("logout.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => console.log(data.success ? "You've been logged out!" : `You were not logged out ${data.message}`));
    updateEvents();
    updateCalendar();
}

document.getElementById("logout_btn").addEventListener("click", logoutAjax, false); // Bind the AJAX call to button click



function addEventAjax(event) {
    const date = document.getElementById("date").value; // Get the username from the form
    const theDate = new Date(date);
    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate() + 1;
    console.log(theDate);
    console.log(year);
    console.log(month);
    console.log(day);
    const time = document.getElementById("time").value; // Get the password from the form
    const events = document.getElementById("events").value; // Get the repass from the form
    // Make a URL-encoded string for passing POST data:
    const data = { 'year': year, 'month': month, 'day': day, 'time': time, 'events': events };
    console.log("year : " + year + 'month:' + month + 'day:' + day + " " + time + " " + events + JSON.stringify(data));
    fetch("insert.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(res => res.json())
        .then(function (data) {
            data.success ? console.log("You've added event!") : console.log("You've not added event" + data.message);
            updateEvents();
            updateCalendar();
        })
        .catch(error => console.log("error" + error))

}

document.getElementById("add_btn").addEventListener("click", addEventAjax, false); // Bind the AJAX call to button click


function addPublicEventAjax(event) {
    const date = document.getElementById("date").value; // Get the username from the form
    const theDate = new Date(date);
    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate() + 1;
    console.log(theDate);
    console.log(year);
    console.log(month);
    console.log(day);
    const time = document.getElementById("time").value; // Get the password from the form
    const events = document.getElementById("events").value; // Get the repass from the form
    // Make a URL-encoded string for passing POST data:
    const data = { 'year': year, 'month': month, 'day': day, 'time': time, 'events': events };
    console.log("year : " + year + 'month:' + month + 'day:' + day + " " + time + " " + events + JSON.stringify(data));
    fetch("insert_public.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(res => res.json())
        .then(function (data) {
            data.success ? console.log("You've added event!") : console.log("You've not added event" + data.message);
            updateEvents();
            updateCalendar();
        })
        .catch(error => console.log("error" + error))

}

document.getElementById("addPublic_btn").addEventListener("click", addPublicEventAjax, false); // Bind the AJAX call to button click


function edit_event(event_id) {
    const oldName = document.getElementById("edit_events").value;
    const newDate = document.getElementById("edit_date").value;
    const newTime = document.getElementById("edit_time").value;
    const newName = document.getElementById("new_title").value;
    const theDate = new Date(newDate);
    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate() + 1;
    const dataString = { 'oldName': oldName, 'year': year, 'month': month, 'day': day, 'newTime': newTime, 'newName': newName };
    console.log(dataString);
    fetch("edit.php", {
        method: 'POST',
        body: JSON.stringify(dataString),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            data.success ? console.log("You've edited event!") : console.log("You've not edited event" + data.message);
            updateEvents();
            updateCalendar();
        })
        //.then(dataString => console.log(dataString.success ? "Event has been editted!" : `Event has not been editted ${dataString.message}`))
        .catch(error => console.log("error" + error));
}
document.getElementById("edit_btn").addEventListener("click", edit_event, false); // Bind the AJAX call to button click

function shareEvent(event_id) {
    
    const newUserName = document.getElementById("share_events").value;
    const newDate = document.getElementById("share_date").value;
    const newTime = document.getElementById("share_time").value;
    const name = document.getElementById("new_share_title").value;
    const theDate = new Date(newDate);
    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate() + 1;
    const dataString = { 'newUserName': newUserName, 'year': year, 'month': month, 'day': day, 'newTime': newTime, 'name': name };
    console.log(dataString);
    fetch("share.php", {
        method: 'POST',
        body: JSON.stringify(dataString),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            data.success ? console.log("You've shared event!") : console.log("You've not shared event" + data.message);
            updateEvents();
            updateCalendar();
        })
        //.then(dataString => console.log(dataString.success ? "Event has been shared!" : `Event has not been shared ${dataString.message}`))
        .catch(error => console.log("error" + error));
}
document.getElementById("share_btn").addEventListener("click", shareEvent, false); // Bind the AJAX call to button click




function delete_event(event_id) {
    const event = document.getElementById("delete_events").value;
    const dataString = { 'delete_events': event };
    console.log(dataString);
    fetch("delete.php", {
        method: 'POST',
        body: JSON.stringify(dataString),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            data.success ? console.log("You've deleted event!") : console.log("You've not deleted event" + data.message);
            updateEvents();
            updateCalendar();
        })
        .catch(error => console.log("error" + error));
}
document.getElementById("delete_btn").addEventListener("click", delete_event, false); // Bind the AJAX call to button click




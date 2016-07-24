// Enable pseudo selectors on iOS
document.addEventListener("touchstart", function() {}, false);

// Show overlay when "Add Stop" button is clicked
var trigger = document.getElementById("addStop");
var overlay = document.getElementById("overlay");
trigger.addEventListener("click", function() {
    overlay.classList.add("visible");
});

// Add stop to list on form submit
var form = overlay.firstElementChild;
var schedule = document.getElementById("schedule");
form.addEventListener("submit", function(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Validate form submission and extract data
    // ....validate here....
    var busNum = document.getElementById('busNum').value;
    var stopID = document.getElementById('stopID').value;
    var nickname = document.getElementById('nickname').value;

    // Create and style button and append to DOM
    var ul = document.querySelector('ul');
    var li = document.createElement('li');
    var button = document.createElement('button');
    button.classList.add("btn", "btn-block", "bus-stop");
    ul.appendChild(li);
    li.appendChild(button);

    // Add data (ex. BUS: 46 | STOP: 28747)
    var name = document.createElement('span');
    name.textContent = nickname;
    var details = document.createElement('span');
    details.textContent = busNum + ":" + stopID;
    button.appendChild(name);
    button.appendChild(details);
    button.lastElementChild.style['font-size'] = '10px';

    // Link button to schedule
    button.addEventListener("click", function(event) {
        // Empty button, then append loading animation div
        var children = button.childNodes;
        for(var i = 0; i < children.length; i++){
            children[i].style.display = "none";
        }
        var animation = document.getElementsByClassName("spinner")[0];
        animation.classList.add("animate");
        button.appendChild(animation);

        // Send data to schedule header
        var h1 = document.querySelector("h1");
        var name = h1.firstElementChild;  // first span
        var details = h1.lastElementChild;  // second span
        name.textContent = nickname;
        details.textContent = busNum + ":" + stopID;
        details.style['font-size'] = '10px';

        // Send data to schedule body
        getTimes(busNum, stopID);
    }, false);

    // Exit overlay
    overlay.classList.remove("visible");
});

function getTimes(bus, stop) {
    busNum = bus;
    stopID = stop;
    var token = "?auth_token=SeQVpws7zfFC1Sqsx6twmswxwJkD5vdnyJLTxujPTho7GNfK4CaBsArr"

    // Get realtime data via HTTP request to RideOn API
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        // Check status of request
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
              handleResponse();
            } else {
              console.error(xhr.statusText);
            }
        }
    }

    xhr.open("GET", "http://rideonrealtime.net/arrivals/" + stopID + ".json" + token, true);
    xhr.send();

    function handleResponse() {
        // Handle the response, which comes in JSON format
        var json = xhr.responseText;
        var data = JSON.parse(json);

        // Get calculated arrivals, which is based on realtime data
        var arrivals = data["calculated_arrivals"];

        // Get times that are of busNum
        var times = [];
        console.log('working');
        arrivals.forEach(function(arrival) {
            if (arrival['route']['route_short_name'] == busNum) {
                times.push(arrival['calculated_display_time']);
            }
        });
        times.sort();  // sort in ascending times

        var h2 = document.querySelector("h2");
        var h3 = document.querySelector("h3");
        var h4 = document.querySelector("h4");
        h2.textContent = times[0];
        h3.textContent = times[1];
        h4.textContent = times[2];

        // Show schedule overlay
        schedule.classList.add("show");
    }
    
}

// Define a function that will remove a class whenever sent element and className 



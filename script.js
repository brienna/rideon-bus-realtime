
var busNum = "46";  // later change to receive input from user
var stopID = "25630";  // later change too
var token = "?auth_token=SeQVpws7zfFC1Sqsx6twmswxwJkD5vdnyJLTxujPTho7GNfK4CaBsArr"

// Get realtime data via HTTP request to RideOn API
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://rideonrealtime.net/arrivals/" + stopID + ".json" + token, false);
xhr.send();

// Check status of request
console.log(xhr.status, xhr.statusText);  // should get 200, OK

// Handle the response, which comes in JSON format
var json = xhr.responseText;
var data = JSON.parse(json);

// Get calculated arrivals, which is based on realtime data
var arrivals = data["calculated_arrivals"];
console.log(arrivals);

// Get times that are of busNum
times = [];
arrivals.forEach(function(arrival) {
    if (arrival['route']['route_short_name'] == busNum) {
        times.push(arrival['calculated_display_time']);
    }
});
times.sort();  // sort in ascending times















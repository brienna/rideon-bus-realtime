
// Make the HTTP request to obtain realtime data
var xhr = new XMLHttpRequest();
xhr.open("GET", 'http://rideonrealtime.net/gtfs_realtime.txt?auth_token=SeQVpws7zfFC1Sqsx6twmswxwJkD5vdnyJLTxujPTho7GNfK4CaBsArr', false);
xhr.send();

// Check status of request
console.log(xhr.status)  // should get 200
console.log(xhr.statusText);  // should get OK
console.log(typeof xhr.response);  // should be string

// Handle the response, which comes in text format
// It needs to be converted to JSON
var response = xhr.responseText;
response = "{" + response + "}";
// Add commas after key:value pairs
response = response.replace(/((?:[^{}]))(\n)((?!\s+}))/g, "$1,$3");
// Add comma after object value (no trailing commas)
response = response.replace(/(})(\s+)(\b)/g, "$1,$3");
// Add colon after key that precedes an object value
response = response.replace(/(\b)(\s[{])/g, "$1: {");
var FULL_DATASET = null;  // just to shut up the "undefined" warning, may need to fix this
var json = JSON.stringify(eval("(" + response + ")"));
var data = JSON.parse(json);
console.log(typeof data);
console.log(data);






//Reads file and returns content

function readFile(fileName){

	var response ="";

	var req = new ActiveXObject("Microsoft.XMLHTTP");
	req.onreadystatechange = function(){
		if(req.readyState == 4){
			if(req.responseText == ""){
			alert("Not able to read from file: " + fileName);
			}
			else{
			//process(req.responseText,fileName);
			response = req.responseText;
			
			}
		}
	}

	req.open("GET", fileName, true);
	req.setRequestHeader("Content-Type","charset=utf-8");
	req.send(null);
	return response;
}

//Converts string to date object

function makeDate(dateStr){
	var dt1 = parseInt(dateStr.substring(0,2));
	var mo1 = parseInt(dateStr.substring(4,6));
	var yr1 = parseInt(dateStr.substring(6,10));
	var d = new Date(yr1,mo1-1,dt1);

return d;
}

//convert date to weekday
function getWeekDay(d){

var dayArr = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

var dt = d.getUTCDay();

returnValue = dayArr[dt] + " " + d.toLocaleDateString(); 
return returnValue;
}



//Look for timezones and return true or false
function timeSpanPresent(rawData){
	if(rawData.indexOf("Time Zones") == -1){
	return false;
	}
	else{
	return true;
	}
}

//extract timezones
function getTimeZones(rawData){
var section = rawData.split("***");
section = section[2].trim();

var dStr = section.split("\n");
var dDates = [];

for(i = 0; i < dStr.length; i++){
	dDates.push(makeDate(dStr[i]));
}

return dDates;
}

//extract Version 
function getVersion(rawData){
	var version = rawData.slice(rawData.indexOf("VERSION:")+8,rawData.indexOf("*")-1);

	return version.trim();
}

//extract plans
function getPlans(rawData){
var sections = rawData.split("***");
var iterator = 3;
var plans = [];

for(var i = iterator; i < sections.length; i+=2){
	var planName = sections[i].trim();
	var daysArray = findDays(sections[i+1]);
	var tripFile = getTripFile(sections[i+1]);
	var pathFile = getPathFile(sections[i+1]);
	var boundaryFile = getBoundaryFile(sections[i+1]);

	var obj = {
		name: planName,
		dates: daysArray,
		trpFile: tripFile,
		pthFile: pathFile,
		bdyFile: boundaryFile
	};

	plans.push(obj);
	
	}
return plans;
}




//extract Boundary File
function getBoundaryFile(rawData){

var fileName = rawData.slice(rawData.indexOf("BOUNDARY_FILES:")+15,rawData.indexOf("BDY")+3).trim();

return fileName;
}


//extract Path File
function getPathFile(rawData){

var fileName = rawData.slice(rawData.indexOf("PATH_FILES:")+11,rawData.indexOf("PTH")+3).trim();

return fileName;
}

//extract Trip File
function getTripFile(rawData){

var fileName = rawData.slice(rawData.indexOf("TRIP_FILES:")+11,rawData.indexOf("TRP")+3).trim();

return fileName;
}


//extract days
function findDays(rawData){

var str = rawData.replace(/\n\s*\n/g, '**');
str = str.slice(str.indexOf("DAYS:")+5,str.indexOf("**")).trim();

var dStr = str.split("\n");
var dDates = [];

for(i = 0; i < dStr.length; i++){
	dDates.push(makeDate(dStr[i]));
}

return dDates;
}

//extract trains
function getTrains(fileName){

var rawData = readFile(fileName);
var tripLists = rawData.split("TRAIN:");
var trains = [];

for(var i = 1; i < tripLists.length; i++){
var data = tripLists[i].trim();
var trainName = data.slice(0,data.indexOf("\n"));

var obj = {
	number: trainName.trim()
};

trains.push(obj);

}



return trains;
}

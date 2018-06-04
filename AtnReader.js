console.log("Hello");

makeStopObject("FRS1  	00:00	S	-	-	T");

function makeStopObject(stopData){
var n = stopData.slice(0,4);
var t = stopData.slice(stopData.indexOf(":")-2,stopData.indexOf(":") +3);

console.log(t);
}
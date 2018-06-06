

//makeStopObject("FRS1  	01:04	S	-	-	T");

readFile("AtnFiles/TAL01.PTH",getPaths,false);

function makeStopObject(stopData) {
    var dataArray = stopData.replace(/\s/g, '');
    var n = stopData.slice(0, 4);
    var t = stopData.slice(stopData.indexOf(":") - 2, stopData.indexOf(":") + 3);
    t = t.split(":");
    var s = parseInt(t[0]) * 60;
    s = s + parseInt(t[1]);
    var time = new Date(s * 1000);
    var s1 = dataArray.slice(9, 10);
    var s2 = dataArray.slice(10, 11);
    var s3 = dataArray.slice(11, 12);
    var s4 = dataArray.slice(12, 13);

    var obj = {
        name: n,
        time: time,
        slot1: s1,
        slot2: s2,
        slot3: s3,
        slot4: s4
    }
    return obj;
}

function makePathObject(pathData){

    pathData = pathData.replace(/(\n)/g,"$1**");
    var stops = pathData.split("**");
    var stopArray = [];

    var l = stops.length;
    for(var i = 1; i < l; i++){
        stopArray.push(makeStopObject(stops[i]));
    }

    var obj = {
        id: stops[0].slice(0,4),
        stops: stopArray
    };

    //console.log(obj.stops[0]);
    return obj;
}

function getPaths(pathsData){
var paths = pathsData.split("PATH:");
var l = paths.length;
makePathObject(paths[1].trim());
//for(var i = 1; i < l; i++){
  //  var path = makePathObject(paths[i].trim());
//}

}

function readFile(fileName, callbackFunc, outputXml) {
    var req;
    var IE = false;
    if (window.XMLHttpRequest) {
        console.log("Modern xmlhttp detected...");
        req = new XMLHttpRequest();
    } else {
        console.log("ActiveX detected");
        req = new ActiveXObject("Microsoft.XMLHTTP");
        IE = true;
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            console.log("File successfully read...");
            if (req.responseXML == "") {
                console.log("File " + fileName + " is empty");
            }
            else {
                if (outputXml) {
                    if(IE){
                        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                        xmlDoc.async ="false";
                        xmlDoc.loadXML(req.responseText);
                        callbackFunc(xmlDoc);
                    }
                    else{
                        callbackFunc(req.responseXML);
                    }

                    
                } else {
                    callbackFunc(req.responseText);
                }
            }
        } else {
            //console.log("readystate: " + req.readyState + " Satus: " + req.status);
        }
    };
    req.open("GET", fileName, true);
    req.send();
}
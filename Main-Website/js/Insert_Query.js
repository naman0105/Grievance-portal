var No_of_people_in_Higher_Level;
var counter_in_Higher_Level;
var Issue_Handler_ID1;
var Issue_Handler;
var Higher_Employee_Level_Number;
function Submit_Query(){
  document.getElementById('submitquery').disabled = true;
  window.alert("you have submitted a query");
    var now = new Date();

    var orgname =  localStorage.getItem("Company_Name");
    var Employee_Name = localStorage.getItem("Employee_Name");
    var Employee_ID = localStorage.getItem("Employee_ID");
	var Employee_Phone_Number = localStorage.getItem("Employee_Phone_Number");
	var Employee_Level_Number = parseInt(localStorage.getItem("Employee_Level_Number").charAt(6));

	Higher_Employee_Level_Number = Employee_Level_Number + 1;
	console.log(Higher_Employee_Level_Number);

	var firebaseRef = firebase.database().ref(orgname + "/" + "leveldesig" + "/Level " + Higher_Employee_Level_Number);
	firebaseRef.once("value", function(snapshot) {
		counter_in_Higher_Level = parseInt(snapshot.val().counter);
		No_of_people_in_Higher_Level = parseInt(snapshot.val().noofpeople);
		console.log(counter_in_Higher_Level);
		console.log(No_of_people_in_Higher_Level);
	  });
	setTimeout(function(){
    //
		// if(counter_in_Higher_Level >= No_of_people_in_Higher_Level){
		// 	counter_in_Higher_Level = 0;
		// 	console.log("Counter = 0");
		// }



		var rootRef = firebase.database().ref(orgname + "/Level " + Higher_Employee_Level_Number);
		var urlRef = rootRef.child(counter_in_Higher_Level);
		urlRef.once("value", function(snapshot) {
		snapshot.forEach(function(child) {
			console.log(child.key+": "+child.val());
			if(child.key == "ID"){
				Issue_Handler_ID1 = parseInt(child.val());
				console.log("Issue_Handler_ID1 = " + Issue_Handler_ID1);
			}
      if(child.key == "Name"){
        Issue_Handler = child.val();
        console.log("Issue Handler Name " + Issue_Handler);
      }
		});
		});
	},10000);
		/*var firebaseRef = firebase.database().ref(orgname + "/Level " + Higher_Employee_Level_Number + "/" + counter_in_Higher_Level);
		firebaseRef.on("value", function(snapshot) {
			console.log(snapshot.val());
			Issue_Handler_ID1 = snapshot.val().ID;
			Issue_Handler_Name = snapshot.val().Name;
			console.log(Issue_Handler_ID1);
			console.log(Issue_Handler_Name);
		});
	*/
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 6; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		Query_id = text;
		//Deadline = "10 Days"
		//orgname = "Monish_Company"
		console.log("Orgname = " + orgname);

		var Query_Question = document.getElementById("Query_text").value;
		console.log(Query_Question);

		//if(No_of_people_inLevel>)


		setTimeout(function(){
		var firebaseRef = firebase.database().ref(orgname + "Query_id" + '/' + Query_id).update({

			Query_text: Query_Question,
			Time: dateFormat(now, "h:MM:ss TT"),
			Date: moment().format('MM/DD/YYYY'),
			Issue_Handler_ID: Issue_Handler_ID1.toString(),
      Issue_Handler: Issue_Handler,
      Issue_Handler_Level: Higher_Employee_Level_Number,
      Issue_Handler_Deadline: moment().add(10, 'days').calendar(),
			Issue_Raiser: Employee_Name,
			Issue_Raiser_ID: Employee_ID
		});
		counter_in_Higher_Level++;
    if(counter_in_Higher_Level == No_of_people_in_Higher_Level){
      counter_in_Higher_Level = 0;
    }
		var firebaseRef = firebase.database().ref(orgname + "/" + "leveldesig" + "/Level " + Higher_Employee_Level_Number).update({
			counter: counter_in_Higher_Level // update level number
	});
},20000);
}

function Check_Status(){

}


var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

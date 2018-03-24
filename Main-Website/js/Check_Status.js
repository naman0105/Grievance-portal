var Company_Name = localStorage.getItem("Company_Name");
var Employee_ID = localStorage.getItem("Employee_ID");
// document.getElementById('dead').innerHTML = moment().add(10, 'days').calendar();
// document.getElementById('dead').innerHTML =moment("20170914", "YYYYMMDD").fromNow();
// document.getElementById('dead').innerHTML =moment().format('DD/MM/YYYY');
// var start = "09/17/2017";
// var end = "09/24/2017";
//
// var daysremain = moment(end,"MM/DD/YYYY").diff(moment(start,"MM/DD/YYYY"))/(24*60*60*1000);
// console.log(daysremain);
// if( daysremain > 5){
//   console.log("fuck");
// }



var ref = firebase.database().ref(Company_Name + "Query_id");
ref.orderByChild("Issue_Raiser_ID").equalTo(Employee_ID).on("child_added", function(snapshot) {
    console.log(snapshot.val());
    var detail = snapshot.val();
    var queries = document.getElementById('submitted');
    queries.className = "container jumbotron";
    queries.appendChild(document.createTextNode("Query:: " +snapshot.val().Query_text));
    queries.appendChild(document.createElement('hr'));
    if(snapshot.hasChild("answer")){
      queries.appendChild(document.createTextNode("Answer:: "+ snapshot.val().answer));
    }
    else{
      queries.appendChild(document.createTextNode("the query is not resolved yet"));
    }
    var mybr = document.createElement('br');
    queries.appendChild(mybr);
    queries.appendChild(document.createTextNode("Handled by:: "+snapshot.val().Issue_Handler +"  "+ detail.Issue_Handler_ID+"  Raised on  "  + detail.Date + "  " + detail.Time));
    var rule = document.createElement('hr');
    rule.style.cssText = 'height : 15px';
    queries.appendChild(rule);
    });

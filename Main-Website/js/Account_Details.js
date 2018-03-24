var Employee_ID = localStorage.getItem("Employee_ID");


window.addEventListener('load',
function() {


var Details = document.getElementById('Account_details');
var Headding = document.getElementById('Heading');

// var Company_Name = localStorage.getItem("Company_Name");
var Employee_Name = localStorage.getItem("Employee_Name");
var Employee_Email_ID = localStorage.getItem("Employee_Email_ID");
var Employee_Department = localStorage.getItem("Employee_Department");
var Employee_Phone_Number = localStorage.getItem("Employee_Phone_Number");

Headding.appendChild(document.createTextNode("Welcome " + Employee_Name));

Details.appendChild(document.createTextNode("Employee ID : "+ Employee_ID));
Details.appendChild(document.createElement('hr'));

Details.appendChild(document.createTextNode("Employee Name : "+ Employee_Name));
Details.appendChild(document.createElement('hr'));

Details.appendChild(document.createTextNode("Employee Email_ID : "+ Employee_Email_ID));
Details.appendChild(document.createElement('hr'));

Details.appendChild(document.createTextNode("Employee Department : "+ Employee_Department));
Details.appendChild(document.createElement('hr'));

Details.appendChild(document.createTextNode("Employee Phone Number : "+ Employee_Phone_Number));
Details.appendChild(document.createElement('hr'));
});

var Company_Name =  localStorage.getItem("Company_Name");
// var Issue_Handler_ID = localStorage.getItem("Issue_Handler_ID");


function showquery(){

  var ref = firebase.database().ref(Company_Name + "Query_id");
  ref.orderByChild("Issue_Handler_ID").equalTo(Employee_ID).on("child_added", function(snapshot) {
      console.log(snapshot.val());
      var detail = snapshot.val();
      querydetails = document.getElementById('querydetails');
      querydetails.appendChild(document.createTextNode("Query :: " + detail.Query_text));
      querydetails.appendChild(document.createElement('hr'));
      var inputanswer= document.createElement('textarea');
      inputanswer.id = "queryanswer";
      inputanswer.type = "text";
      inputanswer.placeholder = "Write the answer for the given query";
      querydetails.appendChild(inputanswer);
      querydetails.appendChild(document.createElement('br'));
      var button = document.createElement('button');
      button.innerHTML = "Submit";
      button.id = "subbutton";
      button.className = "btn btn-primary";
      button.onclick = function(){
        document.getElementById("queryanswer").disabled = true;
        document.getElementById("subbutton").disabled = true;
        var queryans = document.getElementById("queryanswer").value;
        ref.child(snapshot.key).update({
          answer : queryans
        })
      }
      querydetails.appendChild(button);
      submitterdetail = document.getElementById('submitterdetail');
      submitterdetail.appendChild(document.createTextNode("submitted by :: "+ detail.Issue_Raiser +" "+detail.Issue_Raiser_ID));
      submitterdetail.appendChild(document.createTextNode("submitted on :: " + detail.Date + " " + detail.Time));
      });

}

function Submit_a_Query(){
    window.open("InsertQuery.html","_self");
}

function Check_Query_Status(){
    window.open("CheckStatus.html","_self");
}

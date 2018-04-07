var nooflevels = 7;
orgname = "Facebook";
var Obtained_password;
var flag = false;

function Submit_SignIn(){
    console.log('Submit Clicked');
    document.getElementById('submitSignIn').disabled = true;
    orgname  = document.getElementById('Company_Name').value;
    PhoneNumber = document.getElementById("Phone_Number").value;
    console.log(Phone_Number);

    var Entered_Password = document.getElementById("Entered_password").value;
    console.log(Entered_Password);

    //var Company_Name = document.getElementById("Company_Name").value;
    //console.log(Company_Name);

    //localStorage.setItem("Company_Name", Company_Name);

    for( i =1 ; i<= nooflevels; i++){
        var firebaseRef = firebase.database().ref(orgname).child('Level '+i);
        firebaseRef.orderByChild("Phone_Number").equalTo(PhoneNumber).on("child_added", function(snapshot) {
           console.log(snapshot.val().password);

           localStorage.setItem("Employee_Name",snapshot.val().Name);
           localStorage.setItem("Employee_ID",snapshot.val().ID);
           localStorage.setItem("Employee_Phone_Number",snapshot.val().Phone_Number);
           localStorage.setItem("Employee_Email_ID",snapshot.val().Email_ID);
           localStorage.setItem("Employee_Department",snapshot.val().Department);
           
           Obtained_password = snapshot.val().password;
            
            });
    }
    setTimeout(function(){
    if(Obtained_password == Entered_Password){
        window.alert("password accepted welcome");
        location.href = "details.html";
    }else{
        window.alert("password not accepted");
    }
},10000);
}

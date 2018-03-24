var Confirm_Password;
var phoneNumber = localStorage.getItem("phoneNumber");
var orgname =  localStorage.getItem("Company_Name");
var nooflevels = 4;
// var Level_Nos = localStorage.getItem("Level_Nos");
var userdetails;
var passwordchanged;


function Submit_SetPassword(){
    console.log('Submit Clicked');

    var Enter_Password = document.getElementById("set_password").value;
    console.log(Enter_Password);

    Confirm_Password = document.getElementById("confirm_password").value;
    console.log(Confirm_Password);

    if (Enter_Password == Confirm_Password){
    if (checkPassword(Enter_Password) == true){
        console.log('Password Accepted');

        for( i =1 ; i<= nooflevels; i++){
            var firebaseRef = firebase.database().ref(orgname).child('Level '+i);
            firebaseRef.orderByChild("Phone_Number").equalTo(phoneNumber).on("child_added", function(snapshot) {
                // console.log(snapshot.val());
                var d = snapshot.val();
                if( d !=  null){
                    userdetails = d;
                    showlevel();
                }
                });
            }
            
    }else{
        window.alert("Password Must be least six characters, least one number, one lowercase and one uppercase letter");
    }
}else{
    window.alert("Password Must be Same");
}
}
function showlevel() {
    var obj = {password : Confirm_Password};
    // console.log(obj);
    // console.log(userdetails.level);
    var firebaseedit = firebase.database().ref(orgname).child(userdetails.level);
    firebaseedit.update(obj);
    console.log('Password Updated');
    location.href = "details.html";
  }
  
function checkPassword(str)
  {
    // at
    // at 
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);

  }
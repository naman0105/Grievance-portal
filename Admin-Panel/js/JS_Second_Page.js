var level_no = localStorage.getItem("Level_No");
var myBooks;
var nameorg = localStorage.getItem("nameorg");
console.log(nameorg);
console.log('nextpage' + level_no);
// document.write('you have selected  ->' + level_no);
document.getElementById('Heading_Page_2').innerHTML = level_no;
Display();
function Display(){
    var firebaseRef = firebase.database().ref(nameorg+"/"+level_no);
    firebaseRef.on('value',snap => {
        myBooks = snap.val();
        var col = [];

        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        var table = document.createElement("table");
        var tr = table.insertRow(-1);

        // for (var i = 0; i < col.length; i++) {
          for(var i = col.length-1 ; i>=0 ; i--){
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        for (var i = 0; i < myBooks.length; i++) {
          //  for (var i = myBooks.length-1 ; i>=0 ; i--){
            tr = table.insertRow(-1);

            // for (var j = 0; j < col.length; j++) {
              for ( var j = col.length-1 ; j>=0 ; j--){
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }

        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
     });
}

// function Search(){
//     var search_box_value = document.getElementById("Search_box").value;
//     const preObject = document.getElementById('object');
//
//     console.log(search_box_value);
//     console.log('clicked search');
//
//     var firebaseRef = firebase.database().ref(level_no);
//     firebaseRef.orderByChild("name").equalTo(search_box_value).on("child_added", function(snapshot) {
//
//         var d = snapshot.val();
//         //console.log(snapshot.val());
//         // console.log(d.name);
//         preObject.innerHTML = d.name + "    " + d.id;
//         // preObject.innerText = JSON.stringify(snapshot.val(), null , 3);
//         myBooks = snapshot.val();
//   });
// }

function Search(){
  document.getElementById('object').innerHTML= " ";
  var boxvalue = document.getElementById("Search_box").value;
  const preObject = document.getElementById('object');
  if( boxvalue == ""){ return;}
    for(var i=0; i< myBooks.length ; i++){
      // if(myBooks[i].name == boxvalue ){
        if(myBooks[i].name.search(boxvalue.toLowerCase()) == 0){
        preObject.appendChild(document.createTextNode(myBooks[i].name+"     "+ myBooks[i].id));
        preObject.appendChild(document.createElement('hr'));
      };
    }
}

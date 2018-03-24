var nooflevels = 0;
var json_array = [];
var levels = [];
var k = 0;
var desigcount = 1 ;
function addlevel(){
    nooflevels++;
    localStorage.setItem("levels",levels);
    localStorage.setItem("nooflevels", nooflevels);
    var level = document.getElementById('levels');
    level.appendChild(document.createTextNode("level "+ nooflevels + " : "));
    var inputtagtext =document.createElement("input");
    inputtagtext.id = "textfield" + nooflevels;
    inputtagtext.placeholder = "designation";
    inputtagtext.type ="text";
    level.appendChild(inputtagtext);
    level.appendChild(document.createTextNode("      "));
    var inputtag = document.createElement("input");
    inputtag.id="xlf" + nooflevels;
    inputtag.type ="file";
    inputtag.accept = ".xlsx,.csv";
    level.appendChild(inputtag);
    level.appendChild(document.createElement("hr"));
}

function start(){
  var a =document.getElementById("xlf" + nooflevels);
  a.addEventListener('change', handleFile, false);
}

/* fixdata and rABS are defined in the drag and drop example */
/* processing array buffers, only required for readAsArrayBuffer */
function fixdata(data) {
var o = "", l = 0, w = 10240;
for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
return o;
}

var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
  function handleFile(e) {
    var files = e.target.files;
    var i;
    for (i = 0; i != files.length; ++i) {
      var f = files[i];

      var object =  new Object();

      var reader = new FileReader();
      var name = f.name;
      reader.onload = function(e) {
        var data = e.target.result;

        var workbook;
        if(rABS) {
          /* if binary string, read with type 'binary' */
          workbook = XLSX.read(data, {type: 'binary'});
        } else {
          /* if array buffer, convert to base64 */
          var arr = fixdata(data);
          workbook = XLSX.read(btoa(arr), {type: 'base64'});
        }

        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        console.log(XLSX.utils.sheet_to_html(worksheet));
        object.number = XLSX.utils.sheet_to_json(worksheet).length;
        console.log("this is the id" + this.id )
        object.designation = document.getElementById('textfield'+ desigcount).value;

        if(desigcount == nooflevels){
          var btn = document.getElementById("button");
          btn.style.cursor ="pointer";
          btn.disabled = false;
        }


        desigcount++;
        levels.push(object);


        // var desigRef = firebase.database().ref('Leveldesig').child('level'+ desigcount);
        // desigRef.set(object);

        var b = XLSX.utils.sheet_to_html(worksheet);
        document.getElementById("yeah").innerHTML = b;
        console.log(XLSX.utils.sheet_to_json(worksheet));
        console.log(XLSX.utils.sheet_to_json(worksheet).length);
        console.log(levels);
        var noofpeople = XLSX.utils.sheet_to_json(worksheet).length;
        //console.log(XLSX.utils.sheet_to_csv(worksheet));
        //console.log(XLSX.utils.sheet_to_formulae(worksheet));
        json_array[k] = XLSX.utils.sheet_to_json(worksheet);
        for( z=0 ; z<noofpeople; z++){
          json_array[k][z].level = "Level "+ (k+1) +"/"+z;
        }
        console.log(json_array[k]);
        k++;
      };
      reader.readAsBinaryString(f);
    }
  }

function uploadJson(){
    var t = 0;
    var nameorg = document.getElementById("organization").value;
    localStorage.setItem("nameorg",nameorg);
    for(t = 0;t<k;t++){
      var messageListRef = firebase.database().ref(nameorg+'/Level ' + (t+1));
      console.log(t);
       messageListRef.set(json_array[t]);
      //  messageListRef.child("leveldesig").set(levels[t].designation);
    }
    for(t = 0;t<k;t++){
      var messageListRef = firebase.database().ref(nameorg+'/leveldesig/Level '+ (t+1));
      messageListRef.child('designation').set(levels[t].designation);
      messageListRef.child('noofpeople').set(levels[t].number);
      messageListRef.child('counter').set('null');
    }
    var database = firebase.database();
    console.log(database);

}

var e = document.getElementById('second');
e.style.display = 'none';


function Submit(){
  e.style.display = 'block';
  var f = document.getElementById('first');
  f.style.display = 'none';
  // console.log(nooflevels);
  // window.open ('levels.html','_self',false);
}




function showlevels(){
  var nooflevels = localStorage.getItem("nooflevels");
  console.log(nooflevels);
  for(x = 1; x <= nooflevels; x++){
    var firstlevel = document.getElementById("levelsdisplay");
    var buttons = document.createElement('button');
    buttons.innerHTML = "level " + x;
    buttons.id= "Level " + x;
    buttons.onclick = function(){
      console.log(this.id);
      localStorage.setItem("Level_No",this.id);
      window.open('Second_Page.html');
    }
    document.getElementById("main").disabled=true;
    buttons.className = "btn btn-primary";
    firstlevel.appendChild(buttons);
    // firstlevel.appendChild(document.createElement('h3').innerHTML=levels[x-1].number);
    firstlevel.appendChild(document.createTextNode(" No of person in this level : "+ levels[x-1].number + "   "));
    firstlevel.appendChild(document.createTextNode(levels[x-1].designation));

    firstlevel.appendChild(document.createElement('hr'));
  }

}

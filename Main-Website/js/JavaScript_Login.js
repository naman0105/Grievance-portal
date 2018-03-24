var d ;
var Company_Name = 'Facebook';
var test = 0;

window.onload = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User is signed in');
        var uid = user.uid;
        var email = user.email;
        var photoURL = user.photoURL;
        var phoneNumber = user.phoneNumber;
        console.log(phoneNumber);
        var isAnonymous = user.isAnonymous;
        var displayName = user.displayName;
        var providerData = user.providerData;
        var emailVerified = user.emailVerified;
      }
      updateSignInButtonUI();
      updateSignInFormUI();
      // updateSignOutButtonUI();
      updateSignedInUserStatusUI();
      updateVerificationCodeFormUI();
    });

    // document.getElementById('sign-out-button').addEventListener('click', onSignOutClick);
    document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
    document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);
    document.getElementById('verification-code').addEventListener('keyup', updateVerifyCodeButtonUI);
    document.getElementById('verification-code').addEventListener('change', updateVerifyCodeButtonUI);
    document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
    document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function(response) {
        console.log('reCAPTCHA solved, allow signInWithPhoneNumber');
        onSignInSubmit();
      }
    });
    recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
      updateSignInButtonUI();
    });
  };

  function onSignInSubmit() {
    if (isPhoneNumberValid()) {
      window.signingIn = true;
      updateSignInButtonUI();
      var phoneNumber = getPhoneNumberFromUserInput();
      var appVerifier = window.recaptchaVerifier;


      // var Level_Nos = 'Level 1';

      // var firebaseRef = firebase.database().ref(Company_Name + '/' + Level_Nos);
      localStorage.setItem("Company_Name",Company_Name); // saving the company name
      // localStorage.setItem("Level_Nos",Level_Nos); // saving the company name
      console.log(firebaseRef);
      console.log('checking number');
      console.log(phoneNumber);
      // localStorage.setItem("firebaseRef",firebaseRef);
      var levelno;
      var nooflevels = 5;


      for( i =1 ; i<= nooflevels; i++){
          console.log(i);
          var firebaseRef = firebase.database().ref(Company_Name).child('Level '+i);
          firebaseRef.orderByChild("Phone_Number").equalTo(phoneNumber).on("child_added", function(snapshot) {
              console.log(snapshot.val());
              d = snapshot.val();
              if( d.Phone_Number == phoneNumber){
                  localStorage.setItem("phoneNumber",phoneNumber);
                  i = snapshot.val().key;
                  console.log(i);
                  console.log("phonenumber is all set");
                  // levelno = i;
                  // console.log(levelno);
                  test = 1;
              }
              });

          }
    }
      setTimeout(function(){cont();},10000);
      // while(1){
      //   if(d !== null){
      //     break;
      //   }
      // }
      // cont();
  }

  function cont(){

      var phoneNumber = getPhoneNumberFromUserInput();
      var appVerifier = window.recaptchaVerifier;

      if( test == 0)
      { window.alert("the number is not in the database. Reload the page and try to sign-in");
        return;
      }

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          console.log('SMS sent');
          window.confirmationResult = confirmationResult;
          window.signingIn = false;
          updateSignInButtonUI();
          updateVerificationCodeFormUI();
          updateVerifyCodeButtonUI();
          updateSignInFormUI();
        }).catch(function (error) {
          console.log('Error; SMS not sent');
          console.error('Error during signInWithPhoneNumber', error);
          window.alert('Error during signInWithPhoneNumber:\n\n'
              + error.code + '\n\n' + error.message);
          window.signingIn = false;
          updateSignInFormUI();
          updateSignInButtonUI();
        });
  }


  function onVerifyCodeSubmit(e) {
    e.preventDefault();
    if (!!getCodeFromUserInput()) {
      window.verifyingCode = true;
      updateVerifyCodeButtonUI();
      var code = getCodeFromUserInput();
      confirmationResult.confirm(code).then(function (result) {
        console.log('User signed in successfully');

        document.getElementById('display_info').innerHTML = JSON.stringify(d, null , 3);

        var user = result.user;
        window.verifyingCode = false;
        window.confirmationResult = null;
        updateVerificationCodeFormUI();
      }).catch(function (error) {
        console.log('User couldnt sign in (bad verification code?)');
        //console.error('Error while checking the verification code', error);
        //window.alert('Error while checking the verification code:\n\n'+ error.code + '\n\n' + error.message);
        window.verifyingCode = false;
        updateSignInButtonUI();
        updateVerifyCodeButtonUI();
      });
    }
  }

  function cancelVerification(e) {
      console.log('Cancels the verification code input');
    e.preventDefault();
    window.confirmationResult = null;
    updateVerificationCodeFormUI();
    updateSignInFormUI();
  }

  // function onSignOutClick() {
  //   firebase.auth().signOut();
  // }
  function getCodeFromUserInput() {
    return document.getElementById('verification-code').value;
  }

  function getPhoneNumberFromUserInput() {
    return document.getElementById('phone-number').value;
  }

  function isPhoneNumberValid() {
    var pattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    var phoneNumber = getPhoneNumberFromUserInput();
    // we need to add the code to check from the database if yes retun num else return -1

    return phoneNumber.search(pattern) !== -1;
  }

  function resetReCaptcha() {
    if (typeof grecaptcha !== 'undefined'
        && typeof window.recaptchaWidgetId !== 'undefined') {
      grecaptcha.reset(window.recaptchaWidgetId);
    }
  }

  function updateSignInButtonUI() {
    document.getElementById('sign-in-button').disabled =
        !isPhoneNumberValid()
        || !!window.signingIn;
  }

  function updateVerifyCodeButtonUI() {
    document.getElementById('verify-code-button').disabled =
        !!window.verifyingCode
        || !getCodeFromUserInput();
  }

  function updateSignInFormUI() {
    if (firebase.auth().currentUser || window.confirmationResult) {
      document.getElementById('sign-in-form').style.display = 'none';
    } else {
      resetReCaptcha();
      document.getElementById('sign-in-form').style.display = 'block';
    }
  }

  function updateVerificationCodeFormUI() {
    if (!firebase.auth().currentUser && window.confirmationResult) {
      document.getElementById('verification-code-form').style.display = 'block';
    } else {
      document.getElementById('verification-code-form').style.display = 'none';
    }
  }

  // function updateSignOutButtonUI() {
  //   if (firebase.auth().currentUser) {
  //     document.getElementById('sign-out-button').style.display = 'block';
  //   } else {
  //     document.getElementById('sign-out-button').style.display = 'none';
  //   }
  // }

  function updateSignedInUserStatusUI() {
    var user = firebase.auth().currentUser;
    if (user) {
      document.getElementById('sign-in-status').textContent = 'Signed in';
      // document.getElementById('account-details').textContent = JSON.stringify(d, null, '  ');
      var account = document.getElementById('details');
      account.appendChild(document.createElement('hr'));
      account.appendChild(document.createTextNode("The Name of the Employee :: "+ d.Name));
      localStorage.setItem("Company_Name",Company_Name);
      localStorage.setItem("Employee_Name",d.Name);

      account.appendChild(document.createElement('hr'));
      account.appendChild(document.createTextNode("Id :: " + d.ID));

      localStorage.setItem("Employee_ID",d.ID);

      account.appendChild(document.createElement('hr'));
      account.appendChild(document.createTextNode("Phone number :: " + d.Phone_Number ));

      localStorage.setItem("Employee_Phone_Number",d.Phone_Number);

      account.appendChild(document.createElement('hr'));
      account.appendChild(document.createTextNode("Email ID :: "+ d.Email_ID));

      localStorage.setItem("Employee_Email_ID",d.Email_ID);

      account.appendChild(document.createElement('hr'));
      account.appendChild(document.createTextNode("Department :: "+ d.Department));

      localStorage.setItem("Employee_Department",d.Department);
      localStorage.setItem("Employee_Level_Number",d.level);

      account.appendChild(document.createElement('hr'));
      var a = document.createElement('a');
      a.setAttribute('href','Reset_password.html');
      a.innerHTML = 'Click Here To Set Password';
      account.appendChild(a);
      firebase.auth().signOut();
      location.href = "Reset_password.html";
    } else {
      document.getElementById('sign-in-status').textContent = 'Signed out';
      document.getElementById('account-details').textContent = 'null';
    }
  }

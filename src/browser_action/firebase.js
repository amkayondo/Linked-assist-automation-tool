var firebaseConfig = {
    apiKey: "AIzaSyA_TDolMVQUxnjXpgw76-RQxdjXOROWiBQ",
    authDomain: "linkedin-assist-21307.firebaseapp.com",
    projectId: "linkedin-assist-21307",
    storageBucket: "linkedin-assist-21307.appspot.com",
    messagingSenderId: "809427586562",
    appId: "1:809427586562:web:527408338707af39a0611b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var auth = firebase.auth();



function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    var promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.messge));

    alert("signed up");
    
}

function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    var promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.messge));

    alert("signed in" + email);
    
}



function signOut(){
    auth.signOut();
    alert("signed out")
}

auth.onAuthStateChanged(function(user){
    if(user){
        const email = user.email;
        alert("Active user" + email)

    }else{
        alert("No Active user");

    }
});

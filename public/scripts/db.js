//initialze the firebase/firestore
var firebaseConfig = {
    apiKey: "AIzaSyBRJRAOrdi4RtyjgOt_GsdKWOrH5UY8iiU",
    authDomain: "biznet-pwa.firebaseapp.com",
    databaseURL: "https://biznet-pwa.firebaseio.com",
    projectId: "biznet-pwa",
    storageBucket: "biznet-pwa.appspot.com",
    messagingSenderId: "650845683430",
    appId: "1:650845683430:web:22432e17bb495ad7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let biznet_db = firebase.firestore();

//fxn to take form values from DOM
function getValue(id) {
    return document.getElementById(id).value;
}

//Caching firebase with indexDB
biznet_db.enablePersistence().catch(err => {
    if (err.code == "failed-precondition") {
        //prolly muti tabs opens
        console.log("persistence failed");
    } else if (err.code == "unimplemented") {
        //lack of browser support
        console.log("Persistence not available")
    }
})

var loadIndexDb = function () {
    //Listener from db and post to  DOM
    biznet_db.collection("biznet_db").onSnapshot((snap) => {
        //console.log(snap.docChanges());
        snap.docChanges().forEach(dtype => {
            if (dtype.type === "added") {
                //add to List of items
                renderCard(dtype.doc.data(), dtype.doc.id);
                //console.log(dtype.doc.id);
                timeoutSpinner();
            }
            else if (dtype.type === "removed") {

            }
        });
    })
}

function loadDetails(card) {
    animateAndViewDetails();
    console.log(card.id);

    timeoutSpinner();
}

//Register a new business
function loadSignUp() {
    document.getElementById("signUpForm").addEventListener("submit", submitForm);
    timeoutSpinner();
}





//Method to get the phone numbers
function getPhone() {
    let phone;
    let phone1 = getValue("phone1");
    let phone2 = getValue("phone2");
    if (phone2.trim() === "") {
        phone = phone1
    } else {
        phone = `${phone1} / ${phone2}`;
    }
    return phone;
}

//Method to get business status
function getBusinessStatus() {
    let option = document.querySelector("input[name] = 'status':checked").value;
    return option;
}

//Get working hours into a string
function workHours() {
    let workHour;
    let from = getValue("worksFrom");
    let to = getValue("worksTill");
    if (from.trim() !== "" && to.trim() !== "") {
        workHour = `from ${from} to ${to}`;
    } else {
        workHour = "";
    }
    return workHour;
}

//Get Image and save to storage
let imgUrl = "";
$("#image").on("change", function () {
    let imgPath = this.files[0];

    // Create a root reference
    var storageRef = firebase.storage().ref("images/" + imgPath.name);
    //console.log(storageRef);

    var task = storageRef.put(imgPath);

    task.on("state_changed", function complete(obj) {
        //console.log(obj.a.downloadURLs[0]);
        imgUrl = obj.a.downloadURLs[0];
    });
});

function submitForm(evt) {
    evt.preventDefault();

    var newData = {
        business_name: getValue("tradeName"),
        cords: [getValue("latitudeField"), getValue("longitudeField")],
        description: getValue("description"),
        email: getValue("email"),
        // id: "",
        image: imgUrl,
        location: getValue("addressField"),
        phone: getPhone(),
        type: getBusinessStatus(),
        work_hours: workHours()
    };

    biznet_db.add(newData).catch(e => console.log(e));
    console.log("sent Successfully")
    form.reset();
    console.log("sent Successfully reset")

}

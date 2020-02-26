// global variables
var latitudeVal = 40.731;
var longitudeVal = 40.731;
var clickedCardId = -1;


/**
 * This method hides/shows the profile menu or the login form as required
 */
function toggleLoginAndProfile() {
    // check if user has logged in or not to show or hide login/profile.
}

/**
 * This method shows the spinner
 */
function showSpinner() {
    $(".fa-spinner").show();
}

/**
 * This method times out the spinner
 */
function timeoutSpinner() {
    setTimeout(hideSpinner, 500);
}

/**
 * This method hides the spinner
 */
function hideSpinner() {
    $(".fa-spinner").hide();
}

/**
 * This method changes the placeholder text in the goods/services descrption in response to 
 * the produce type selected
 */
function chgDescPlaceholder() {
    var productDescArea = document.querySelector("#description");
    var goodsType = document.querySelector("#produceType0");
    var servicesType = document.querySelector("#produceType1");
    var bothType = document.querySelector("#produceType2");
    if (goodsType.checked) {
        productDescArea.setAttribute("placeholder", "Goods Description");
    } else if (servicesType.checked) {
        productDescArea.setAttribute("placeholder", "Service(s) Description");
    } else {
        productDescArea.setAttribute("placeholder", "Goods/Service(s) Description");
    }
}

/**
 * This method gets the current location of the user
 */
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayCurrentPosition, showGPSOperationError);
    } else {
        gpsAlert.setAttribute("class", "alert alert-danger")
        gpsAlert.textContent = "Geolocation is not supported by this browser!";
    }
}

/**
 * This method displays the current position in the latitude and longitude fields
 * @param {"The position info obtained with the navigator's geolocation"} position 
 */
function displayCurrentPosition(position) {
    var latitudeField = document.querySelector("#latitudeField");
    var longitudeField = document.querySelector("#longitudeField");
    latitudeVal = position.coords.latitude;
    longitudeVal = position.coords.longitude
    latitudeField.value = latitudeVal;
    longitudeField.value = longitudeVal;
    // show successs message
    var gpsAlert = document.querySelector("#gpsAlert");
    gpsAlert.setAttribute("class", "alert alert-success")
    gpsAlert.textContent = "Successfully acquired GPS location!";
    // display location on map and get the readable address
    initSignUpMap();
}

/**
 * This method display errors that occurred while finding current position
 * @param {"Geolocation error."} error 
 */
function showGPSOperationError(error) {
    var gpsAlert = document.querySelector("#gpsAlert");
    switch (error) {
        case error.PERMISSION_DENIED:
            gpsAlert.setAttribute("class", "alert alert-danger");
            gpsAlert.textContent = "User denied the request for Geolocation!";
            break;
        case error.POSITION_UNAVAILABLE:
            gpsAlert.setAttribute("class", "alert alert-danger");
            gpsAlert.textContent = "Location information is unavailable!";
            break;
        case error.TIMEOUT:
            gpsAlert.setAttribute("class", "alert alert-danger");
            gpsAlert.textContent = "The request to get user location timed out!";
            break;
        case error.UNKNOWN_ERROR:
            gpsAlert.setAttribute("class", "alert alert-danger");
            gpsAlert.textContent = "An unknown error occurred!";
            break;
    }
}

/**
 * This method initializes the google maps for the details page
 */
function initDetailsMap() {
    var mapDiv = document.querySelector("#map");
    var map = new google.maps.Map(mapDiv, {
        zoom: 15,
        center: { lat: latitudeVal, lng: longitudeVal },
    });
}

/**
 * This method initializes the google maps for the sign up page
 */
function initSignUpMap() {
    var mapDiv = document.querySelector("#map");
    var map = new google.maps.Map(mapDiv, {
        zoom: 8,
        center: { lat: latitudeVal, lng: longitudeVal }
    });
    var geocoder = new google.maps.Geocoder;
    var infoWindow = new google.maps.InfoWindow;

    geocodeAddress(geocoder, map, infoWindow);
}

/**
 * This method geocode a given map coordinate
 * @param {"google.maps.Geocoder object."} geocoder 
 * @param {"google.maps.Map object."} map 
 * @param {"google.maps.InfoWindow object."} infoWindow 
 */
function geocodeAddress(geocoder, map, infoWindow) {
    var addressField = document.querySelector("#addressField");
    var mapDiv = document.querySelector("#map");
    var latlng = { lat: parseFloat(latitudeVal), lng: parseFloat(longitudeVal) };
    geocoder.geocode({ "location": latlng }, function (results, status) {
        if (status === "OK") {
            if (results[0]) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                var addressVal = results[0].formatted_address;
                addressField.value = addressVal.toString();
                infoWindow.setContent(addressVal);
                infoWindow.open(map, marker);
                mapDiv.style.display = "block";
            } else {
                $("#errMsg").text("Failed to get address! Try searching again or provide it manually.");
                $("#errModal").modal();
            }
        } else {
            $("#errMsg").text("Failed to get address! Try searching again or provide it manually.");
            $("#errModal").modal();
        }
    });
}

/**
 * This method toggle animates the search menu dropdown on the homepage
 */
function animateSearchMenu() {
    $("#searchMenu").animate({ height: "toggle", opacity: "toggle", display: "block" }, "fast");
}

/**
 * This method toggle animates the extra menu options dropdown on the profile page
 */
function animateExtraMenuOptions() {
    $("#extraMenuOptions").animate({ height: "toggle", opacity: "toggle", display: "block" }, "fast");
}

/**
 * This method animates the clicked card and calls the viewDetails function
 * @param {"The id of the card that was clicked."} cardId 
 */
function animateAndViewDetails(cardId) {
    clickedCardId = cardId;
    // animate the card that was clicked and view details after that
    $("#" + clickedCardId).toggle("explode", 10);
    $("#" + clickedCardId).toggle("explode", 10, viewDetails);
}

/**
 * This method loads the details page
 */
function viewDetails() {
    window.location.href = "assets/details.html";
    console.log(clickedCardId);
}

/**
 * This method sets the modal image to the image office/shop image
 */
function setModalImg() {
    document.querySelector("#modalImage").src = document.querySelector("#image").src;
}

/**
 * This method opens the working days dialog
 */
function showDaysModal() {
    availableDays = document.querySelector("#workingDays").value;
    availableDays = availableDays.split(",");
    availableDays.forEach(element => {
        element = element.trim();
        if (element === "Sunday") {
            document.querySelector("#sunCheckbox").checked = true;
        }
        if (element === "Monday") {
            document.querySelector("#monCheckbox").checked = true;
        }
        if (element === "Tuesday") {
            document.querySelector("#tueCheckbox").checked = true;
        }
        if (element === "Wednesday") {
            document.querySelector("#wedCheckbox").checked = true;
        }
        if (element === "Thursday") {
            document.querySelector("#thuCheckbox").checked = true;
        }
        if (element === "Friday") {
            document.querySelector("#friCheckbox").checked = true;
        }
        if (element === "Saturday") {
            document.querySelector("#satCheckbox").checked = true;
        }
    });
    $("#daysModal").modal();
}

/**
 * This method clears the selected working days
 */
function clearWorkingDays() {
    $("#workingDays").val("");
}

/**
 * This method returns the selected working days
 */
function getSelectedWorkingDays() {
    var selectedDays = "";
    if (document.querySelector("#sunCheckbox").checked) {
        if (selectedDays === "") {
            selectedDays = document.querySelector("#sunCheckbox").value;
        } else {
            selectedDays += ", " + document.querySelector("#sunCheckbox").value;
        }
    }
    if (document.querySelector("#monCheckbox").checked) {
        if (selectedDays === "") {
            selectedDays = document.querySelector("#monCheckbox").value;
        } else {
            selectedDays += ", " + document.querySelector("#monCheckbox").value;
        }
    }
    if (document.querySelector("#tueCheckbox").checked) {
        if (selectedDays === "") {
            selectedDays = document.querySelector("#tueCheckbox").value;
        } else {
            selectedDays += ", " + document.querySelector("#tueCheckbox").value;
        }
    }
    if (document.querySelector("#wedCheckbox").checked) {
        if (selectedDays === "") {
            selectedDays = document.querySelector("#wedCheckbox").value;
        } else {
            selectedDays += ", " + document.querySelector("#wedCheckbox").value;
        }
    }
    if (document.querySelector("#thuCheckbox").checked) {
        if (selectedDays === "") {
            selectedDays = document.querySelector("#thuCheckbox").value;
        } else {
            selectedDays += ", " + document.querySelector("#thuCheckbox").value;
        }
    }
    if (document.querySelector("#friCheckbox").checked) {
        if (selectedDays === "") {
            selectedDays = document.querySelector("#friCheckbox").value;
        } else {
            selectedDays += ", " + document.querySelector("#friCheckbox").value;
        }
    }
    if (document.querySelector("#satCheckbox").checked) {
        if (selectedDays === "") {
            selectedDays = document.querySelector("#satCheckbox").value;
        } else {
            selectedDays += ", " + document.querySelector("#satCheckbox").value;
        }
    }
    $("#workingDays").val(selectedDays);
    $("#closeDaysModalBtn").click();
}

/**
 * This function changes the operation status (opened/closed) of the business
 */
function changeBusinessStatus() {
    var selectedOptionValue = document.querySelector('input[name="status"]:checked').value;
    console.log(selectedOptionValue);
}

/**
 * This script makes the name of a selected file appear for the custom file inputs
 */
$(".custom-file-input").on("change", function () {
    var acceptedImgExt = ["jpg", "jpeg", "png", "gif"];
    var filePath = $(this).val();
    var fileName = filePath.split("\\").pop();
    var fileNameExt = fileName.split(".");
    var fileExt = fileNameExt[fileNameExt.length - 1].toLowerCase()
    if (acceptedImgExt.indexOf(fileExt) > -1) {
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        try {
            document.getElementById('image').src = window.URL.createObjectURL(this.files[0]);
        } catch (error) {
            // do nothing  console.log(error)
        }
    } else {
        $("#errMsg").text("Unacceptable file format! Expected JPG(JPEG), PNG OR GIF");
        $("#errModal").modal();
    }
});

/**
 * This function adds swipe to open sidebar effect
 */
$(function () {
    $("html").swipe({
        swipeRight: function (event, direction, distance, duration, fingerCount, fingerData) {
            // console.log("You swiped " + direction + " with " + fingerCount + " fingers");
            $(".nav-button").click();
        },
        threshold: 0,
        fingers: 'all'
    });
});

/**
 * This function adds swipe to close sidebar effect
 */
$(function () {
    $("html").swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount, fingerData) {
            // console.log("You swiped " + direction + " with " + fingerCount + " fingers");
            $("#close-sidebar").click();
        },
        threshold: 0,
        fingers: 'all'
    });
});
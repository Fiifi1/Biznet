"use strict";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../service-worker.js").then(reg => {
    //console.log("sw registered", reg);
  }).catch(err => {
    //console.log("error registering sw", err);
  });
}

//window.addEventListener("touchstart", func, { passive: true });
let list = document.getElementById("listContainer");


var renderCard = (data, id) => {
  //console.log(id);
  const html = `<div class="listLightBg card cardShadow" id="${id}" onclick="loadDetails(this)">
          <div class="listLightBg card-body" style="padding: 0px; border: none; margin: 0px;">
            <ul class="list-group list-group-flush listLightBg">
              <!--Business name and running status-->
              <li class="list-group-item listLightBg">
                <label class="form-control listLightBg"
                  style="border: none; margin: 0px; font-weight: bold; text-align: center;">
                  ${data.business_name}
                  <i class="fa fa-lg fa-lock listLightBg"
                    style="color: crimson; padding: 2px; padding-top: 10px; border: none;"></i>
                </label>
              </li>
              <!--Business type and description-->
              <li class="list-group-item listLightBg">
                <label class="form-control listLightBg"
                  style="border: none; padding-top: 0px; padding-bottom: 0px; text-align: center;">${data.description}</label>
              </li>
              <li class="list-group-item listLightBg">
                <!--Address and Distance-->
                <label class="form-control listLightBg"
                  style="border: none; padding-top: 0px; padding-bottom: 0px;  text-align: center;">${data.location + ", " + data.work_hours}</label>
              </li>
            </ul>
          </div>
        </div>`;

  list.innerHTML += html;
}
"use strict";

window.addEventListener("DOMContentLoaded",
  function() {
    const it = document.querySelectorAll(".it");
    it.forEach(function(element, index) {
      setTimeout(function () {
          element.classList.add("fade-in");
        }, 200 * index);//0.2s setting
    });  
  }, false
);
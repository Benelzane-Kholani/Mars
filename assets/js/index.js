
let imageDisplay = document.querySelector(".image-diplay");
let submit = document.querySelector(".submit");

function validate(YYYY, MM, DD){
    if(YYYY === "" || MM === "" || DD === ""){
        return false;
    }
    else{
        return true;
    }
}

async function getMarsImages(YYYY, MM, DD) {

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${YYYY}-${MM}-${DD}&api_key=z2Ui75u500zMV2ygVKMXwl4DjY7DTkVkon01z8pQ`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        alert("something went wrong");
      }
  
      const json = await response.json();
      imageDisplay.innerHTML = ``;

      if(json.photos.length === 0){
        alert("Images not found for that date, start from 2012-08-06 to 2024-01-21 for results");
      }

      json.photos.forEach((element)=> {
        let newDiv = document.createElement("div")
        newDiv.className = "col-lg-2 col-md-3"; 
        newDiv.innerHTML = `<img src=${element.img_src} class="img-fluid" alt="">`
        imageDisplay.appendChild(newDiv);
      })

      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }

  submit.addEventListener("click", function(){

    const form = document.getElementById("form");
    const formData = new FormData(form);

    const YYYY = formData.get("year");
    const MM = formData.get("month");
    const DD = formData.get("day");

    if(validate(YYYY, MM, DD)){
        getMarsImages(YYYY, MM, DD);
    }
    else{
        alert("Please enter valid date")
    }
  })
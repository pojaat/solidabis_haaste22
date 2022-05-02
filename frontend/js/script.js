async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
    console.log(response.cookie);
}

// Ravintola data rajapinnasta.
const api_url = 
      "https://solidabis.pojjaat.app/api/v1/restaurants/helsinki";
getapi(api_url);


// Äänestys.
function vote(id) {
        let url = `https://solidabis.pojjaat.app/api/v1/vote/${id}`;      
        let xhr = new XMLHttpRequest();
        xhr.open("POST",url);
        xhr.onload;
        xhr.send(data);
}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function show(data) {
    let restaurantList = data["restaurants"];
    let voted = false;
    if (data["alreadyVoted"] != null) {voted = true};
    let vote = "";
    
    let tab =
        ``;
        // Ravintola- moduulit datasta.
        for (let restaurants of restaurantList) {
            nimi = restaurants.name;
            auki = restaurants.openingHours; if (auki == "") {auki = "-"};
            äänet = restaurants.votes
            if (!voted) {vote += `<button onclick="vote('${restaurants.id}')"> +1! </button> `}
            tab += `
                <h3><strong> ${nimi}</strong></h3>
                <ul>
                    <li>
                        <strong>Aukiolo:</strong> ${auki}
                    </li>
                    <li>
                    <strong>Äänet:</strong> ${äänet}
                    </li>
                    ${vote}
                </ul>`;vote = "";
            
            }
         
         document.getElementById("restaurants").innerHTML = tab;
}
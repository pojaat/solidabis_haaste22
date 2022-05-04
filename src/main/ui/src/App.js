import './App.css';

function App() {
  let cookie

  async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    if (response) {
      hideloader();
    }
    console.log(data.voterId)
    cookie = data.voterId
    show(data);
  }

  // Ravintola data rajapinnasta.
  const api_url =
    "http://localhost:8080/api/v1/restaurants/helsinki";
  getapi(api_url);

  // Äänestys.
  function vote(id) {
    console.log(document.cookie)
    console.log(id)
    let url = `http://localhost:8080/api/v1/vote/${id}`;
    let data = { restaurantid: id };

    fetch(url, {
      credentials: "same-origin",
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  }

  function hideloader() {
    document.getElementById('loading').style.display = 'none';
  }

  function show(data) {
    let restaurantList = data["restaurants"];
    let voted = false;
    if (data["alreadyVoted"] != null) { voted = true };
    let vote = "";

    let tab =
      ``;
    // Ravintola- moduulit datasta.
    for (let restaurants of restaurantList) {
      let nimi = restaurants.name;
      let auki = restaurants.openingHours; if (auki === "") { auki = "-" };
      let äänet = restaurants.votes
      if (!voted) { vote += `<button onclick="vote('${restaurants.id}')"> +1! </button> ` }
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
                </ul>`; vote = "";

    }

    document.getElementById("restaurants").innerHTML = tab;
  }

  return (
    <div>
      <h1>
        Helsingin Tikkataulu
      </h1>
      <div>
        <div className="d-flex justify-content-center">
          <div className="spinner-border"
            role="status" id="loading">
            <span className="sr-only">loading...</span>
          </div>
        </div>
        <h3>Restaurangs;</h3>

        <div className="container justify-content-center border" id="restaurants">
          <div className="row justify-content-center border" id="restaurants">
            <div className="col justify-content-center border" id="restaurants">
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default App;

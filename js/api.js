const base_url = "https://api.football-data.org";
const api_key = "15c6238b302140bfaebbc66e0abec6bc";
const endpoint_team = `${base_url}/v2/competitions/SA/teams`;
const endpoint_standing = `${base_url}/v2/competitions/SA/standings`;

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
//proses fetch
const fetchAPI = url => {
  return fetch(url, {
      headers: {
          'X-Auth-Token': api_key
      }
  })
};
// Blok kode untuk melakukan request data json
function getTeams() {
  //untuk request cache
  if ('caches' in window) {
    caches.match(endpoint_team).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let teamsHTML = "";
          data.teams.forEach(function(team) {
            teamsHTML += `
            <div class="card" style="padding: 10px; justify-content: center;">
            <a href="./team.html?id=${team.id}">
            <h5>NAMA Club : ${team.name}</h5>
            <h5>Logo : <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:100px;height:100px"></h5>
            <h5>Stadion : ${team.venue}</h5>
            <p>Warna : ${team.clubColors}</p>
            <p>Tahun Berdiri : ${team.founded}</p>
            <p>Web Official : <a href="${team.website}" target="_blank" rel="noopener noreferrer">${team.website}</a></p>
            </a>
            </div>
            `;
          });
          
          document.getElementById("teams").innerHTML = teamsHTML;
        })
      }
    })
  }
  
    fetchAPI(endpoint_team)
    .then(status)
    .then(json)
    .then(function(data) {      
      let teamsHTML = "";
      data.teams.forEach(function(team) {
        teamsHTML += `
        <div class="card" style="padding: 10px">
            <a href="./team.html?id=${team.id}">
            <h5>NAMA Club : ${team.name}</h5>
            <h5>Logo : <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:100px;height:100px"></h5>
            <h5>Stadion : ${team.venue}</h5>
            <p>Warna : ${team.clubColors}</p>
            <p>Tahun Berdiri : ${team.founded}</p>
            <p>Web Official : <a href="${team.website}" target="_blank" rel="noopener noreferrer"> ${team.website}</a></p>
            </a>
          </div>
        `;
      });
      
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getTeamsById() {
  return new Promise(function(resolve, reject) {
  
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(endpoint_team).then(function(response) {
      if (response) {
        response.json().then(function(data){
          data.teams.forEach((el)=> {
            if (el.id == idParam){
              var teamHTML = `
              <div class="card" style="padding: 10px">
                <h5>NAMA Club : ${el.name}</h5>
                <h5>Logo : <img src="${el.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:100px;height:100px"></h5>
                <h5>Stadion : ${el.venue}</h5>
                <p>Warna : ${el.clubColors}</p>
                <p>Tahun Berdiri : ${el.founded}</p>
                <p>Web Official : <a href="${el.website}" target="_blank" rel="noopener noreferrer">${el.website}</a></p>
              </div>
              `;

          document.getElementById("body-content").innerHTML = teamHTML;
          resolve(data);
            }
          });
        });
      }
    });
  }

    fetchAPI(endpoint_team)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      // Menyusun komponen card artikel secara dinamis
      data.teams.forEach((el)=> {
        if (el.id == idParam){
          var teamHTML = `
          <div class="card" style="padding: 10px">
            <h5>NAMA Club : ${el.name}</h5>
            <h5>Logo  : <img src="${el.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:100px;height:100px"></h5>
            <h5>Stadion : ${el.venue}</h5>
            <p>Warna : ${el.clubColors}</p>
            <p>Tahun Berdiri : ${el.founded}</p>
            <p>Web Official : <a href="${el.website}" target="_blank" rel="noopener noreferrer">${el.website}</a></p>
          </div>`;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = teamHTML;

      resolve(data);
        }
      });
      
    });
  })
}
getTeamsById();

//mengambil data dari indexeddb
function getSavedTeams(){
  getAll().then(function(teams) {
    console.log(teams);

    var teamsHTML = "";
    teams.forEach(function(team) {
      var description = team.name.substring(0,100);
      teamsHTML +=`
      <div class="card" style="padding: 10px">
      <a href="./team.html?id=${team.id}&save=true">
      <h5>NAMA Club : ${team.name}</h5>
      <h5>Logo : <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:100px;height:100px"></h5>
      <h5>Stadion :${team.venue}</h5>
      <p>Warna : ${team.clubColors}</p>
      <p>Tahun Berdiri : ${team.founded}</p>
      <p>Web Official : <a href="${team.website}" target="_blank" rel="noopener noreferrer">${team.website}</a></p>
      </a>
    </div>`;
    });
    document.getElementById("body-content").innerHTML = teamsHTML;
  })
}
function getSavedTeamById(){
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function(team) {
    teamsHTML +=`
    <div class="card" style="padding: 10px">
    <h5>NAMA Club : ${team.name}</h5>
    <h5>Logo : <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:100px;height:100px"></h5>
    <h5>Stadion :${team.venue}</h5>
    <p>Warna : ${team.clubColors}</p>
    <p>Tahun Berdiri : ${team.founded}</p>
    <p>Web Official : <a href="${team.website}" target="_blank" rel="noopener noreferrer">${team.website}</a></p></div>`;
    document.getElementById("body-content").innerHTML = teamsHTML;
  })
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      var tx = db.transaction(endpoint_team, "readonly");
      var store = tx.objectStore(endpoint_team);
      return store.get(id);
    })
    .then(function(team) {
      resolve(team);
    });
  });
}

//Blok klasemen
function getStanding() {
  //Check ke cache
  if ('caches' in window) {
    caches.match(endpoint_standing).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          let standingHTML = "";
          data.standings[0].table.forEach(function(standings) {
            standingHTML += `
            <tr>
                <td>${standings.position}</td>
                <td><img src="${standings.team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:100px;height:100px"></td>
                <td>${standings.team.name}</td>
                <td>${standings.playedGames}</td>
                <td>${standings.won}</td>
                <td>${standings.draw}</td>
                <td>${standings.lost}</td>
                <td>${standings.points}</td>
                <td>${standings.goalsFor}</td>
                <td>${standings.goalsAgainst}</td>
                <td>${standings.goalDifference}</td>
            </tr>
            `;
          });
        
          document.getElementById("standing").innerHTML = standingHTML;
        })
      }
    })
  }
  //request JSON
  fetchAPI(endpoint_standing)
  .then(status)
  .then(json)
  .then(function(data) {
    let standingHTML = "";
    data.standings[0].table.forEach(function(standings) {
      standingHTML += `
      <tr>
          <td>${standings.position}</td>
          <td><img src="${standings.team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width:100px; height:100px;"></td>
          <td>${standings.team.name}</td>
          <td>${standings.playedGames}</td>
          <td>${standings.won}</td>
          <td>${standings.draw}</td>
          <td>${standings.lost}</td>
          <td>${standings.points}</td>
          <td>${standings.goalsFor}</td>
          <td>${standings.goalsAgainst}</td>
          <td>${standings.goalDifference}</td>
      </tr>
      `;
    });
    
    document.getElementById("standing").innerHTML = standingHTML;
  })
  .catch(error);
}
getStanding();

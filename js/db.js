let dbPromised = idb.open("serie-apps", 1, function(upgradeDb) {
    let teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keypath: "id"
    });
    teamsObjectStore.createIndex("name", "name", {unique: false});
})
//untuk menyimpan teams
function saveTeam(teams) {
    dbPromised
    .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(teams);
        store.put(teams,teams.id);
        return tx.complete;
    })
    .then(function() {
        console.log("Teams Berhasil disimpan ");
        M.toast({html: 'Teams saved', classes: 'rounded'});
    });
}
//untuk hapus team
function deleteTeam(teams) {
    dbPromised
    .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(teams);
        store.delete(teams.id);
        return tx.complete;
      }).then(function() {
        console.log('Teams deleted');
        M.toast({html: 'Teams Deleted', classes: 'rounded'});
      });
}
//untuk menampilkan data dalam indexeddb
function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.getAll();
        })
        .then(function(teams) {
            resolve(teams);
        })
    })
}


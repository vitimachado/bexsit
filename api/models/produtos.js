const db = require('../config/firebase.js');

exports.searchCollection = (collection, where, where2, fun) => {  
  let query = db.collection(collection)
    .where(where[0], where[1], where[2]);
    if(where2) query.where(where2[0], where2[1], where2[2]);

    return query.get()
    .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }    
        console.log('snapshot', snapshot);
        let promises = snapshot.docs.map(doc => fun(doc));  
        
        return promises;
      })
      .catch(err => {
        console.log('Error getting documents', err);
        res.json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
      });
}
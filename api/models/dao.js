const db = require('../config/firebase.js');

exports.searchCollection = (collection, where, where2, fun) => {  

    console.log('searchCollection', collection, where, where2);
    let query = db.collection(collection);

    if(where === null && where2 === null) return returnPromisse(query.orderBy("creationDate", "desc"), fun);
    if(where2 === null) return returnPromisse(query.where(where[0], where[1], where[2]), fun);
    else return returnPromisse(query.where(where[0], where[1], where[2]).where(where2[0], where2[1], where2[2]), fun);

  }

  exports.updateDocument = (collection, document, value) => { 

    let query = db.collection(collection).doc(document).update(value);
    console.log('updateDocument', collection, document, query);
    return query;
  }

  exports.searchDocument = (collection, document, fun) => {  

    let query = db.collection(collection).doc(document);
    return returnPromisse(query, null);
  }  

  returnPromisse = (query, fun) => {  
      return query.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return null;
            }    
            //console.log('snapshot', snapshot);
                           
                //let promises = snapshot.docs.map(doc => fun(doc));            
            if(fun !== null) return snapshot.docs.map(doc => fun(doc)); 
            else return snapshot.data();
        })
        .catch(err => {
            console.log('Error getting documents', err);
        return err;
        });
  }
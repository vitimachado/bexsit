const firestore = require('../models/produtos.js');

exports.getTags = function(req, res) {    

    firestore.searchCollection('tabs', ['title', '>', ''], null, (doc) => {
        return { id: doc.id, ...doc.data() }
    }).then(data => {
            if(data) res.json({statusCode: "200", data});
        }        
    ).catch(err => {
      console.log('Error', err);
      res.json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
    });
};

exports.getTagProdutos = function(req, res) {    

    let where2 = req.body.search ? ['keywords', 'array-contains', req.body.search] : null;

    firestore.searchCollection('cards', ['tagId', '==', req.body.tagId], where2, (doc) => {
        return doc.data()//{ id: doc.data().id, keywords: doc.data().keywords }
    }).then(data => {
            if(data) res.json({statusCode: "200", data});
        }        
    ).catch(err => {
      console.log('Error', err);
      res.json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
    });
};

exports.getProdutos = function(req, res) {    
    
    console.log('getProdutos', req.body.search);
    if(req.body.search) {
        firestore.searchCollection('cards', ['keywords', 'array-contains', req.body.search], null, (doc) => {
            return doc.data()//{ id: doc.data().id, keywords: doc.data().keywords }
        }).then(data => {
                if(data) res.json({statusCode: "200", data});
            }        
        ).catch(err => {
        console.log('Error', err);
        res.json({statusCode: "500", data: { error: 'Error no acesso ao firesore.' }});
        });
    }
};
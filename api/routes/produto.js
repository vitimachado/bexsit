const ProdutoController = require('../controllers/produtos');

module.exports = (app) => {

    app.get('/getTabs', ProdutoController.getTags);

    app.post('/getTagProdutos', ProdutoController.getTagProdutos);

    app.post('/getProdutos', ProdutoController.getProdutos);
  };
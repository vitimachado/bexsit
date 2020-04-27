const db = require('./config/firebase.js');
const puppeteer = require('puppeteer');
const MMARTAN_URL = `https://mmartan.com.br/`;

webScrapingPage();

//(async () => {
async function webScrapingPage() {
  /* Initiate the Puppeteer browser */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Define a window.onCustomEvent function on the page.
  await page.exposeFunction('onCustomEvent', e => {
    console.log(`${e.type} fired`, e.detail || '');
  });

  await listenFor(page, 'app-ready'); // Listen for "app-ready" custom event on page load.
  await listenFor(page, 'click');

  await getTodos(page);
  await browser.close();  
}
//})();


function listenFor(page, type) {
  console.log("listen 0",type);
  return page.evaluateOnNewDocument(type => {
      console.log("listen 1",type);
    document.addEventListener(type, e => {
      console.log("listen 2",{type, detail: e.detail});
      window.onCustomEvent({type, detail: e.detail});
    });
  }, type);
}
         
async function getTodos(page) {

  await page.goto(MMARTAN_URL, { waitUntil: 'networkidle0' });
  let data = await page.evaluate(() => { return document.querySelector('h1').innerText });

  var numPages = await page.evaluate(() => { return document.querySelectorAll('a[class="s140o35n-0 cLiJUq"]').length});  
  console.log("numPages",numPages);

  let linksNavBar = []
  for(let i=0; i<6; i++){
    console.log("key", i);

      data = await page.evaluate((i) => {
        try {
          
          return  {
              href: document.querySelectorAll('a[class="s140o35n-0 cLiJUq"]')[i].href,
              title: document.querySelectorAll('a[class="s140o35n-0 cLiJUq"]')[i].innerText
            } 
                    
        } catch (error) {
          return null
        }
    }, i);
    linksNavBar.push(data);
  }  
  /* Outputting what we scraped */
  console.log(linksNavBar);   

  const promises = linksNavBar.map(async (data, index) => 
    await saveCards(index, linksNavBar, page)
  );

  await Promise.all(promises);

  console.log('Finished!');
}

async function saveCards(index, linksNavBar, page) {

  await page.goto(linksNavBar[index].href, { waitUntil: 'networkidle0' });
  cardsPages = {
    cards: await getCards(page, linksNavBar[index]),
    link: linksNavBar[index]
  };
  console.log('******** cardsPages', cardsPages, 'cardsPages ******** ', index);
  await saveToFirestore(cardsPages.link, cardsPages.cards);
}

async function getCards(page, link){
  
  let getDocumentElement = (query, index, action) => {
    try {
      return document.querySelectorAll(query)[index][action];
    } catch (error) {
      return null;
    }
  };

  var num = await page.evaluate(() => { return document.querySelectorAll('div[class="znbzn-8 gKIFpy"]').length});
  console.log("num",num);

  data = await page.evaluate(() => { return document.querySelectorAll('div[class="znbzn-8 gKIFpy"] > a > div[class="znbzn-0 bEURjz"]').innerText });
  console.log('querySelectorAll', data); 

  let cards = [];
  for(let i=0; i<num; i++){
    console.log("key", i);
    data = await page.evaluate((i, getDocumentElementText) => {
      
      const getDocumentElement = new Function(' return (' + getDocumentElementText + ').apply(null, arguments)');

      try {
        let title = getDocumentElement.call(null, 'div[class="znbzn-8 gKIFpy"] > a > div[class="znbzn-7 gbEUzf"] > div[class="znbzn-2 eInOmt"] > p',i,'innerText');
        return {
          imgFirst: getDocumentElement.call(null, 'div[class="znbzn-8 gKIFpy"] > a > div[class="znbzn-0 bEURjz"] > picture > img[class="znbzn-1 ffCKOd"]', i, 'src'),
          title,
          keywords: title.split(' '),
          descricaoExtra: getDocumentElement.call(null, 'span[class="s181waw4-2 lhSyoE"]',i,'innerText'),
          valorItem: getDocumentElement.call(null, 'span[class="s181waw4-0 kNZcbw"]',i,'innerText')
        } 
        
      } catch (error) {
        return {error}
      }

    }, i, getDocumentElement.toString());
    console.log("data", data);
    cards.push(data);
  }
  return cards;
}

function saveToFirestore(link, cards) {
  
  let docRef = db.collection('tabs');//.doc('teste');

  docRef.add({ ...link })
  .then(async (doc) => {
    let id = doc.id;

    const promises = cards.map(async card =>  await saveCard(docRef, id, card) );
    await Promise.all(promises);

  })
  .catch((error) => console.error("Error adding document type: ", error));
  

}

function saveCard(docRef, docId, card) {

  //let dbKeywords = db.collection('_keywords');
  //let id = docRef.doc(docId).collection('cards').doc().id;

  //docRef.doc(docId).collection('cards').doc(id).set({
  db.collection('cards').add({
   ...card,
   tagId: docId
  }).then((cardDoc) => {

/*     dbKeywords.add({
      id,
      keywords: card.title.split(' ')
    }).then((keywords) => { */
  
      console.log('SAVED documents.');
/*     })
    .catch((error) => console.error("Error adding document keywords: ", error)); */
  
  })
  .catch((error) => console.error("Error adding document cards: ", error));
}

function search() {
  
  let dbKeywords = db.collection('_keywords');
  let westCoastCities = dbKeywords.where('keywords', 'array-contains','normal').get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });  
}
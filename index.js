addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

let arrayOfLinks = [{ "name": "Link Name 1", "url": "https://linkurl1" },
                    { "name": "Link Name 2", "url": "https://linkurl2" },
                    { "name": "Link Name 3", "url": "https://linkurl3" }]
/**
 * Respond with hello worker text
 * @param {Request} request
 */
// async function handleRequest(request) {
//   return new Response('Hello worker!', {
//     headers: { 'content-type': 'text/plain' },
//   })
// }



class LinksTransformer {
  constructor(links){
    this.links = links
  }
  async element(element){
    const divId = element.getAttribute('id')
    if(divId === 'links'){
      this.links.map((link) => {
        element.append(`<a href=${link.url}>${link.name}</a>`, {html: true})
      })
    }

    if(divId === 'profile'){
      element.removeAttribute('style')
    }

  }
}

const rewriter = new HTMLRewriter()
  .on('div', new LinksTransformer(arrayOfLinks))

async function handleRequest(request) {
  const updateResponse = JSON.stringify(arrayOfLinks)
  if(request.url === 'https://example.com/links'){
    return new Response(updateResponse, {
      headers: {'content-type': 'application/json'}
    })
  }else{
    const response = await fetch('https://static-links-page.signalnerve.workers.dev')
    return rewriter.transform(response)
  }
};

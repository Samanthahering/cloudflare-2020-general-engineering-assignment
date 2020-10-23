addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

let arrayOfLinks = [{ "name": "Link Name1", "url": "https://linkurl1" },
                    { "name": "Link Name2", "url": "https://linkurl2" },
                    { "name": "Link Name3", "url": "https://linkurl3" }]
/**
 * Respond with hello worker text
 * @param {Request} request
 */
// async function handleRequest(request) {
//   return new Response('Hello worker!', {
//     headers: { 'content-type': 'text/plain' },
//   })
// }

async function handleRequest(request) {
  const updateResponse = JSON.stringify(arrayOfLinks)
  if(request.url === 'https://example.com/links'){
    return new Response(updateResponse, {
      headers: {'content-type': 'application/json'}
    })
  }else{
    return new Response('this is the else')
  }
}

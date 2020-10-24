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
    const idName = element.getAttribute('id')
    if(idName === 'links'){
      this.links.map((link) => {
        element.append(`<a href=${link.url}>${link.name}</a>`, {html: true})
      })
    }
    if(idName === 'profile'){
      element.removeAttribute('style') 
    }
    if(idName === 'name'){
      element.append('Samantha Hering')
    }
    if(idName === 'avatar'){
      element.setAttribute('src', 'data:image/png;base64,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')
    }
    if(idName === 'social'){
      const styleAttribute = element.getAttribute('style')
      if(styleAttribute){
        element.setAttribute('style', styleAttribute.replace('display: none', 'fill: white'))
      }
      element.append(`<a href='#'><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Cloudflare icon</title><path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.3154-.2246-.3164-.6045-.499-1.0615-.5205l-8.6592-.1123a.1559.1559 0 0 1-.1333-.0713c-.0283-.042-.0351-.0986-.021-.1553.0278-.084.1123-.1484.2036-.1562l8.7359-.1123c1.0351-.0489 2.1601-.8868 2.5537-1.9136l.499-1.3013c.0215-.0561.0293-.1128.0147-.168-.5625-2.5463-2.835-4.4453-5.5499-4.4453-2.5039 0-4.6284 1.6177-5.3876 3.8614-.4927-.3658-1.1187-.5625-1.794-.499-1.2026.119-2.1665 1.083-2.2861 2.2856-.0283.31-.0069.6128.0635.894C1.5683 13.171 0 14.7754 0 16.752c0 .1748.0142.3515.0352.5273.0141.083.0844.1475.1689.1475h15.9814c.0909 0 .1758-.0645.2032-.1553l.12-.4268zm2.7568-5.5634c-.0771 0-.1611 0-.2383.0112-.0566 0-.1054.0415-.127.0976l-.3378 1.1744c-.1475.5068-.0918.9707.1543 1.3164.2256.3164.6055.498 1.0625.5195l1.8437.1133c.0557 0 .1055.0263.1329.0703.0283.043.0351.1074.0214.1562-.0283.084-.1132.1485-.204.1553l-1.921.1123c-1.041.0488-2.1582.8867-2.5527 1.914l-.1406.3585c-.0283.0713.0215.1416.0986.1416h6.5977c.0771 0 .1474-.0489.169-.126.1122-.4082.1757-.837.1757-1.2803 0-2.6025-2.125-4.727-4.7344-4.727"/></svg></a>`, {html: true})
      element.append(`<a href='#'><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Git icon</title><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg></a>`, {html: true})
      element.append(`<a href='#'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"><title>V8 icon</title><path d="M6.832 6c0-.161.008-.322.023-.479.019-.207.07-.401.112-.599l-.694-1.377H0l2.182 3.818h1.527l2.097 3.98a6.534 6.534 0 0 1 1.727-2.745A5.123 5.123 0 0 1 6.832 6zM10.365 19.663L12 22.637l1.637-2.975c-.535.138-1.079.234-1.637.234s-1.101-.096-1.635-.233zM17.728 3.545l-.717 1.258c.056.238.112.476.134.726a5.148 5.148 0 0 1-.677 3.07 6.565 6.565 0 0 1 1.727 2.746l2.097-3.981h1.527L24 3.545h-6.272z M17.846 12.007a6 6 0 0 0-2.073-3.31A4.64 4.64 0 0 0 12 1.363 4.635 4.635 0 0 0 7.363 6a4.62 4.62 0 0 0 .865 2.697A5.988 5.988 0 0 0 6 13.363a6.01 6.01 0 0 0 3.814 5.592 6.02 6.02 0 0 0 4.375-.003 6.006 6.006 0 0 0 3.657-6.945zM12 4.227c1.129 0 2.046.917 2.046 2.045a2.046 2.046 0 0 1-4.092 0c0-1.128.918-2.045 2.046-2.045zm0 11.456a2.32 2.32 0 0 1 0-4.637c1.282 0 2.318 1.037 2.318 2.318S13.282 15.683 12 15.683z"/></svg></a>`, {html: true})
      element.append(`<a href='#'><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>SVG icon</title><path d="M12 0c-1.497 0-2.749.965-3.248 2.17a3.45 3.45 0 00-.238 1.416 3.459 3.459 0 00-1.168-.834 3.508 3.508 0 00-1.463-.256 3.513 3.513 0 00-2.367 1.02c-1.06 1.058-1.263 2.625-.764 3.83.179.432.47.82.82 1.154a3.49 3.49 0 00-1.402.252C.965 9.251 0 10.502 0 12c0 1.497.965 2.749 2.17 3.248.437.181.924.25 1.414.236-.357.338-.65.732-.832 1.17-.499 1.205-.295 2.772.764 3.83 1.058 1.06 2.625 1.263 3.83.764.437-.181.83-.476 1.168-.832-.014.49.057.977.238 1.414C9.251 23.035 10.502 24 12 24c1.497 0 2.749-.965 3.248-2.17a3.45 3.45 0 00.238-1.416c.338.356.73.653 1.168.834 1.205.499 2.772.295 3.83-.764 1.06-1.058 1.263-2.625.764-3.83a3.459 3.459 0 00-.834-1.168 3.45 3.45 0 001.416-.238C23.035 14.749 24 13.498 24 12c0-1.497-.965-2.749-2.17-3.248a3.455 3.455 0 00-1.414-.236c.357-.338.65-.732.832-1.17.499-1.205.295-2.772-.764-3.83a3.513 3.513 0 00-2.367-1.02 3.508 3.508 0 00-1.463.256c-.437.181-.83.475-1.168.832a3.45 3.45 0 00-.238-1.414C14.749.965 13.498 0 12 0zm-.041 1.613a1.902 1.902 0 011.387 3.246v3.893L16.098 6A1.902 1.902 0 1118 7.902l-2.752 2.752h3.893a1.902 1.902 0 110 2.692h-3.893L18 16.098A1.902 1.902 0 1116.098 18l-2.752-2.752v3.893a1.902 1.902 0 11-2.692 0v-3.893L7.902 18A1.902 1.902 0 116 16.098l2.752-2.752H4.859a1.902 1.902 0 110-2.692h3.893L6 7.902A1.902 1.902 0 117.902 6l2.752 2.752V4.859a1.902 1.902 0 011.305-3.246z"/></svg></a>`, {html: true})
    }
    if(element.tagName === 'title'){
      element.setInnerContent('Samantha Hering')
    }
    if(element.tagName === 'body'){
      element.setAttribute('style', 'background-color: #FBB6CE')

    }
  }
}

const rewriter = new HTMLRewriter()
  .on('div', new LinksTransformer(arrayOfLinks))
  .on('img', new LinksTransformer())
  .on('h1', new LinksTransformer())
  .on('title', new LinksTransformer())
  .on('body', new LinksTransformer())

async function handleRequest(request) {
  const updateResponse = JSON.stringify(arrayOfLinks)
  if(request.url === 'https://my-worker.samanthahering.workers.dev/links'){
    return new Response(updateResponse, {
      headers: {'content-type': 'application/json'}
    })
  }else{
    const response = await fetch('https://static-links-page.signalnerve.workers.dev')
    return rewriter.transform(response, {
      headers: {'content-type': 'text/html'}
    })
  }
};

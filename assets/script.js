const uriPath = location.pathname;
// uriPath != '/' && uriPath.indexOf('.html') == -1 ? uriPath.concat('.md') :
let markdownPath = uriPath.replace('.html', '.md');

if (markdownPath.indexOf('.md') == -1) {
  markdownPath += 'index.md';
}

function onLoad() {
  const markdownDiv = document.createElement('div');
  markdownDiv.className = 'markdown-body container';
  markdownDiv.innerHTML = marked(this.responseText);
  const olElements = markdownDiv.getElementsByTagName('ol');
  for (let i = 0; i < olElements.length; ++i) {
    olElements[i].setAttribute('reversed', '');
  }
  document.body.appendChild(markdownDiv);

  const anchor = location.hash;
  if (anchor !== '') {
    location.hash = '';
    location.hash = anchor;
  }
}

const request = new XMLHttpRequest();
request.addEventListener('load', onLoad);
request.open('GET', markdownPath + '?t=' + new Date().getTime().toString());
request.send();

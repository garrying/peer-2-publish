// Adapted from the handy snippets at
// https://beakerbrowser.com/docs/snippets/

// Check if being served over dat

const gatedButtons = document.getElementsByClassName("dat-gate")
const datButtons = Array.from(gatedButtons)
if (window.DatArchive) {
  document.body.classList.add('on-dat')
  datButtons.map((i)=>{
    i.disabled = false
  })
} else {
   datButtons.map((i)=>{
    i.classList.remove('dim')
    i.classList.remove('pointer')
  })
}

// Fork

const forkButton = document.getElementById('fork-presentation')

async function forkCall () {
  await DatArchive.fork(document.location.origin)
}

forkButton.addEventListener('click', forkCall)

// Create

const createButton = document.getElementById('create-project')

async function createCall () {
  await DatArchive.create({
    title: 'The name of the archive',
    description: 'A longer description of the archive',
    type: ['website']
  }).then(async function read (e) {
    var archive = new DatArchive(document.location.origin)
    var buf = await archive.readFile('/README.md')
    return {
      archive: e,
      file: buf
    }
  }).then(async function write (e) {
    console.log(e.archive)
    await e.archive.writeFile('/README.md', e.file)
    document.getElementById('create-feedback').innerText = 'Visit my library'
    document.getElementById('create-feedback').href = `beaker://library/${e.archive.url}`
  })
}

createButton.addEventListener('click', createCall)


// Number of peers

if (window.DatArchive) {

  const archive = new DatArchive(document.location.origin)

  async function peers () {
    var info = await archive.getInfo()
    return info.peers
  }

  peers().then((e)=>{
    document.getElementById('site-peers').innerText = e
    if (e > 0) {
      document.getElementById('site-peers-indicator').innerText = '☺'
    } else {
      document.getElementById('site-peers-indicator').innerText = '☹'
    }
    if (e === 1) {
      document.getElementById('site-peers-indicator-plural').style.display = 'none'
    }
  })

  archive.addEventListener('network-changed', ({peers}) => {
    document.getElementById('site-peers').innerText = peers
    if (peers > 0) {
      document.getElementById('site-peers-indicator').innerText = '☺'
    } else {
      document.getElementById('site-peers-indicator').innerText = '☹'
    }
    if (peers === 1) {
      document.getElementById('site-peers-indicator-plural').style.display = 'none'
    }
  })
} else {
  document.getElementById('site-peers-indicator-wrapper').innerText = 'dat://'
  document.getElementById('link-protocol').innerText = 'https'
}

/*
  * reframe.js - Reframe.js: responsive iframes for embedded content
  * @version v2.2.5
  * @link https://github.com/dollarshaveclub/reframe.js#readme
  * @author Jeff Wainwright <jjwainwright2@gmail.com> (http://jeffry.in)
  * @license MIT
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,e.reframe=t())}(this,function(){"use strict";function e(e,t){var i="string"==typeof e?document.querySelectorAll(e):e,n=t||"js-reframe";"length"in i||(i=[i]);for(var o=0;o<i.length;o+=1){var r=i[o];if(!(-1!==r.className.split(" ").indexOf(n))){var f=r.getAttribute("height"),d=r.getAttribute("width");if(!(d.indexOf("%")>-1||r.style.width.indexOf("%")>-1)){var s=(f||r.offsetHeight)/(d||r.offsetWidth)*100,a=document.createElement("div");a.className=n;var l=a.style;l.position="relative",l.width="100%",l.paddingTop=s+"%";var p=r.style;p.position="absolute",p.width="100%",p.height="100%",p.left="0",p.top="0",r.parentNode.insertBefore(a,r),r.parentNode.removeChild(r),a.appendChild(r)}}}}return e});

reframe('iframe')

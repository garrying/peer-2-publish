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
  })

  archive.addEventListener('network-changed', ({peers}) => {
    document.getElementById('site-peers').innerText = peers
    if (peers > 0) {
      document.getElementById('site-peers-indicator').innerText = '☺'
    } else {
      document.getElementById('site-peers-indicator').innerText = '☹'
    }
  })
} else {
  document.getElementById('site-peers-indicator').innerText = 'dat://'
  document.getElementById('link-protocol').innerText = 'https'
}
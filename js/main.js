// Adapted from the handy snippets at
// https://beakerbrowser.com/docs/snippets/

// Check if being served over dat

if (window.DatArchive) {
  document.body.classList.add('isdat')
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

const archive = new DatArchive(document.location.origin)

async function peers () {
  var info = await archive.getInfo()
  return info.peers
}

peers().then((e)=>{
  document.getElementById('site-peers').innerText = e
})

archive.addEventListener('network-changed', ({peers}) => {
  document.getElementById('site-peers').innerText = peers
  console.log(peers, 'current peers')
})

var Server = require('bittorrent-tracker').Server

var server = new Server({
  udp: false, // enable udp server? [default=true]
  http: false, // enable http server? [default=true]
  ws: true, // enable websocket server? [default=true]
  stats: true, // enable web-based statistics? [default=true]
  //filter: function (infoHash, params, cb) {}
})

// Internal websocket servers exposed as public properties.
server.ws

// Handle errors (critical) and warnings (probably just buggy client)
server.on('error', (err) => { console.log(err.message) })
server.on('warning', (err) => { console.log(err.message) })

// Fired when all requested servers are listening
server.on('listening', function () {
  console.log('listening on ws port:' + server.ws.address().port)
})

// start tracker server listening! Use 0 to listen on a random free port.
server.listen(8080, (err) => { 
  if (err) console.log('Error: ' + err)
  console.log('Tracker is running')
})

// listen for individual tracker messages from peers:
server.on('start', function (addr) {
  console.log('got start message from ' + addr)
})

server.on('complete', function (addr) {
  //This also gets called when a new SEEDER announces to the tracker. Weird
  console.log('nice, a user finished downloading something: ' + addr)
})

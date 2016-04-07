var Server = require('bittorrent-tracker').Server

var server = new Server({
  udp: false, // enable udp server? [default=true]
  http: false, // enable http server? [default=true]
  ws: true, // enable websocket server? [default=true]
  stats: true, // enable web-based statistics? [default=true]
  //filter: function (infoHash, params, cb) {}
})

// Internal http, udp, and websocket servers exposed as public properties.
//server.http
//server.udp
server.ws

server.on('error', function (err) {
  // fatal server error!
  console.log(err.message)
})

server.on('warning', function (err) {
  // client sent bad data. probably not a problem, just a buggy client.
  console.log(err.message)
})

server.on('listening', function () {
  // fired when all requested servers are listening
//  console.log('listening on http port:' + server.http.address().port)
//  console.log('listening on udp port:' + server.udp.address().port)
  console.log('listening on ws port:' + server.ws.address().port)
})

// start tracker server listening! Use 0 to listen on a random free port.
server.listen(8080, 'localhost', (err) => { 
	if (err) console.log('Error: ' + err)
	console.log('Tracker is running')
})

// listen for individual tracker messages from peers:

server.on('start', function (addr) {
  console.log('got start message from ' + addr)
  console.log('Array of infoHashes: ' + Object.keys(server.torrents))
})

server.on('complete', function (addr) {})
server.on('update', function (addr) {
	console.log('Update from: ' + addr)
	console.log('Array of infoHashes: ' + Object.keys(server.torrents))
})
server.on('stop', function (addr) {})

// get info hashes for all torrents in the tracker server
//Object.keys(server.torrents)

// get the number of seeders for a particular torrent
//server.torrents[infoHash].complete

// get the number of leechers for a particular torrent
//server.torrents[infoHash].incomplete

// get the peers who are in a particular torrent swarm
//server.torrents[infoHash].peers
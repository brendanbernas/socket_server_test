var mysql = require("mysql")

var io = require("socket.io").listen(3000)

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'socket_test',
  port: 3306,
  user: 'appuser',
  password: 'appuser'
})

db.connect(function(err){
  if (err) console.log(err)
})

var notes = []
var isInitNotes = false
var socketCount = 0

io.sockets.on('connection', function(socket){

  socketCount++
  io.sockets.emit('users connected', socketCount)

  socket.on('disconnect', disconnectHandler)
  socket.on('new note', newNoteHandler)

  if (isInitNotes){
    socket.emit('initial notes', notes)
  } else {

    db.query('SELECT * FROM notes')
      .on('result', function(data){
        notes.push(data)
      })
      .on('end', function(){
        socket.emit('initial notes', notes)
      })

    isInitNotes = true

  }

})

function disconnectHandler(){
  socketCount--
  io.sockets.emit('users connected', socketCount)
}

function newNoteHandler(data){

  db.query('INSERT INTO notes (note) VALUES (?)', [data.note], function(error, results, fields){
    if (error) throw error

    // Possible issue with date generated from JS not matching date generated from DB
    data.created = new Date()

    notes.push(data)
    io.sockets.emit('new note', data)
  })

}


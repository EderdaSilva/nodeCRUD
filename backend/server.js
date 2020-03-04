const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const uiMongoBD = require('uriMongo.txt');

const MongoClient = require('mongodb').MongoClient;

const uri = "uriMongoBD";
//const uri = "mongodb+srv://edersilva:edersilva@cluster0-zkcvv.mongodb.net/week10?retryWrites=true&w=majority";

MongoClient.connect(uri,(err, client) => {
   if (err) return console.log(err)
   db = client.db('week10') //Nome do Banco
    
   app.listen(3000, () => {
        console.log('server running on port 3000')
   })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine','ejs')

app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.get('/',(req, res) => {
    let cursor = db.collection('data').find()
    //var cursor = db.collection('data').find()  estou na metade da pagina server
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs',{ data: results})
    })
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)
        
        console.log('Salvo no banco de dados !!!')
        res.redirect('/show')

    })

app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('edit.ejs', {data: result})
    })
})
.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname

    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $sent: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/show')
        console.log('Atualizado Banco de dados com sucesso !!!')
    //}
    })
})
   


})




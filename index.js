const express = require('express')
const mysql = require('mysql')
const app = express()
const expressPort = 3000

app.use(express.json())
const dataBase = mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        port: '3306',
        password: 'root',
        database:'restapi'
    })

dataBase.connect((err) => {
    if (err) {console.log("Erreur de connexion")}
       {console.log("bravo,vous êtes connectés")}
})



app.listen(expressPort,() => {
    console.log('serveur tourne sur le port:' , expressPort)})

app.get("/ping",(req,res)=>{
        res.send("pong")})

app.get('/items',(req,res)=> {
    const sql = 'SELECT * FROM items;'
    dataBase.query(sql,(err,results) => {if (err)
        {return res.status(500).json({error:'Erreur du serveur'})}
        
        else {return res.status(200).json(results)}
 })
})

app.post('/caca', (req, res) => {
    const {name,prix,id_category,description}=req.body;
        const sql = "INSERT INTO items (name, prix, id_category, description) VALUES ( ?, ?, ?, ?)";
    
        dataBase.query(sql,[name,prix,id_category,description], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur du serveur' });
        } else {
            return res.status(200).json(results)
        }
    });
});

app.put('/update', (req, res) => { 
    const { id, name, prix, id_category, description } = req.body;
    
    const sql = "UPDATE items SET name = ?, prix = ?, id_category = ?, description = ? WHERE id = ?";
    const values = [name, prix, id_category, description, id];

    dataBase.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur du serveur' });
        } else {
            return res.status(200).json(results);
        }
    });
});

app.delete('/delete', (req, res) => {
    const { id } = req.body;
    
    const sql = "DELETE FROM items WHERE id = ?";
    const values = [id];

    dataBase.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur du serveur' });
        } else {
            return res.status(200).json({ results });
        }
    });
});

app.post('/item-category', async (req, res) => {
    const { name, categoryId } = req.body;
    console.log('Données reçues :', req.body);
    const query = "SELECT id FROM items WHERE name = ?;";
    dataBase.query(query, [name], (err, results) => {
        if (err) {return res.status(500).json({ error: 'Erreur lors de la recherche' });}
        
        const itemId = results[0].id; //extrait l'identifiant id de 1ere ligne du tableau results
       
        const insertQuery = "INSERT INTO item_category (item_id, category_id) VALUES (?, ?)";
        dataBase.query(insertQuery, [itemId, categoryId], (insertErr) => {
            if (insertErr) {return res.status(500).json({ error: 'Erreur du serveur lors de insertion de la relation',});}

            return res.status(200).json({ message: 'Relation item-catégorie créée avec succès' });
        });
    });
}); 


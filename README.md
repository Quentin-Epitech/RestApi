# Pour ce projet RestApi,nous avons plusieurs requêtes dans notre index.js dans le but d'envoyer differentes requête avec Postman
# sur notre DB,pour notre LocalHost du serveur,nous allons utiliser MAMP.

=> Dans notre index.js,les ligne 1 à 20 permettent de configurer notre projet.
    Soit importer le module express,le module MYSQL et de crée l'instance app pour definir nos routes de nos API.

    On va aussi définir un port où Express va fonctionner avec "const expressPort = 3000"

    Ensuite,const dataBase = mysql.createConnection va crée  la connexion avec la BD MYSQL,et database.connect va envoyer la requête 
    de connexion.

=> App.listen nous permet ensuite de nous confirmer que le serveur tourne bien sur le bon port.

# Ensuite,nous avons toutes nos routes que nous allons utiliser avec Postman.

=>App.get/items va recuperer toute les lignes de la colonne items 
    avec sa requête SQL via la route http://localhost:3000/items 
    en passant par Postman en créeant notre route avec ce lien,et va nous renvoyer la reponse dans le body .
    elle va aussi gerer les erreurs en renvoyant un message si il y a un erreur,et aussi si tout est bon.

=>app.post/caca va être une route pour crée une nouvelle colonne dans la table items grâce à la requête SQL.
    Dans postman,nous devons configurer comme avant cette route,et dans le body choisir raw et donner nos infos que nous voulons
    mettre dans cette colonne.Par exemple : {"name": "Mousse au chocolat","prix" : 600 ,"id_category": 2,"description":"mousse"},
    Puis,la requête va inserer dans la table items cette colonne.Avec un traitement du resultat dans la console.

=>app.put/update va être du même principe,mais elle va elle modifié les données d'une colonne déjà existante.

=>app.delete/delete est aussi du même principe,mais elle va supprimer une colonne demandé en donnant son id.

=>app.post/item-category va elle gerer l'ajout des id de Items et de category dans la table item_category.

    Elle va chercher l'id de du nom donné dans postman,puis va extraire le premier resultat donné par la requête.
    elle va ensuite inserer ces données dans item_category .






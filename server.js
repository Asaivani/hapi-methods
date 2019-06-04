var Hapi=require('@hapi/hapi');
var mysql=require('mysql');

var server=new Hapi.Server({
    host:'localhost',
    port:3000
});
server.route({
    method:"GET",
    path:"/",
    handler:(request,reply)=>{
        return "Welcome to HAPI Server";
    }
})
server.route({
    method:"GET",
    path:"/users",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'training'
              });
              connection.connect();
     
              connection.query(`SELECT * from users`, function (error, users, fields) {
                if (error) reject(error);
                resolve(users);
              });
               
              connection.end();
        })
        
    }
})
server.route({
    method:"POST",
    path:"/users",
    handler:(request,reply)=>{
        var newuser=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'training'
              });
              connection.connect();
              connection.query(`INSERT INTO users(user_id,user_name) VALUES('${newuser.user_id}','${newuser.user_name}')`,
              function (error, users, fields) {
                if (error) reject(error);
                resolve(users);
              });
               
              connection.end();
        })
        
    }
});
server.route({
    method:"PUT",
    path:"/users/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var newuse=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'training'
              });
              connection.connect();
              connection.query(`UPDATE users SET user_name='${newuse.user_name}' WHERE user_id=${id}`, 
            function (error, users, fields) {
            if (error) reject(error);
            resolve(users);
          });
              connection.end();
        })
        
    }
});
server.route({
    method:"DELETE",
    path:"/users/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'training'
              });
              connection.connect();
              connection.query(`DELETE from users WHERE user_id=${id}`, function (error, users, fields) {
                if (error) reject(error);
                resolve(users);
              });
              connection.end();
        })
        
    }
})
server.start((err)=>{
    if(err) throw err;
    console.log("Server is started")
});

    /*var books=[{
        id:1,
        title:'Node Js',
        author:'kumar'
    },
    {
        id:2,
        title:'Html basics',
        author:'Jhon'
    }]
    server.route({
        method: 'GET',
        path:'/books',
        handler: (request, h) => {
            return books;
        }
    });
    server.route({
            method: 'POST',
            path:'/books',
            handler: (request, h) => {
                var newbook=request.payload;
                books.push(newbook);
                return books;
            }
        });
    server.route({
            method: 'PUT',
            path:'/books/{id}',
            handler: (request, h) => {
                var id=request.params.id;
                var bookToBeupdated=books.filter((book)=>{
                    return book.id==id
                })
                bookToBeupdated[0].title=request.payload.title;
                return bookToBeupdated;
            }
        });

        server.route({
            method: 'DELETE',
            path:'/books/{id}',
            handler: (request, h) => {
                var id=request.params.id;
                var latestBooks=books.filter((book)=>{
                    return book.id!=id
                })
                return latestBooks;
            }
        });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();*/
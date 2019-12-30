
module.exports = function(app, conn)
{   
    // MAIN PAGE
    
    // 테이블 목록을 가져와서 테이블을 전환할 수 있게 해야해
    
    // 테이블 목록은 전부 넣었으니까 이제 그래픽적으로만 구현하면 되
    
    //----------------------------------기본

    app.get('/', function(req,res){
      res.write('hello!');
    });
    
    app.get('/input/:table', function(req,res){
      
      let table_sql = 'SHOW TABLES';
      let table_list = [];
      
      conn.query(table_sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          for(let i=0; i<rows.length; i++){
            for (let j in rows[i]) {
							table_list.push(rows[i][j]);
            }
          }
        }
      });
      
      let table_selected = req.params.table;
      let sql = `SELECT * FROM ${table_selected}`;
      
      conn.query(sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          var label_data = [];
          for(let j in rows[0]) {
            label_data.push(j);
          }

          let id_index = label_data.findIndex(x => x === 'id');

          label_data.splice(id_index, 1);
          
          res.render('index1', {
              title: "input",
              label_data: label_data,
              table_selected: table_selected,
              table_list: table_list
          });
        }
      });
    });
    
    app.post('/input/:table', function(req, res) {
        
        let table_selected = req.params.table;
        let params = [];
        let target_params = '';
        let value_params = '';
        
        for (let j in req.body) {
          params.push(req.body[j]);
          target_params += j + ', ';
          value_params += '?, ';
        }

        target_params = target_params.slice(0,-2);
        value_params = value_params.slice(0,-2);

        let sql = `INSERT INTO ${table_selected} (${target_params}) VALUES(${value_params})`;
        
        conn.query(sql, params, function(err, rows, fields){
          if(err){
            console.log(err);
          } else {
            console.log('sql : ' + sql);
            res.redirect('/result/' + table_selected);
          }
        });
    });
    
    app.get('/delete/:table/:id', function(req, res) {
      
      let table_selected = req.params.table;
      let deletingId = req.params.id;
      let sql = `DELETE FROM ${table_selected} WHERE id=?`;
      conn.query(sql, [deletingId], function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          console.log(rows);
          res.redirect('/manage/' + table_selected);
        }
      });
    });
    
    app.get('/update/:table/:id', function(req, res) {
      
      let table_sql = 'SHOW TABLES';
      let table_list = [];
      
      conn.query(table_sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          for(let i=0; i<rows.length; i++){
            for (let j in rows[i]) {
							table_list.push(rows[i][j]);
            }
          }
        }
      });
      
      let table_selected = req.params.table;
      let selectId = req.params.id;
      let sql = `SELECT * FROM ${table_selected} WHERE id=?`;
      conn.query(sql, [selectId], function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          res.render('index5', {
              title: "update",
              data_arr: rows,
              table_selected: table_selected,
              table_list: table_list
          });
        }
      });
    });
    
    app.get('/detail/:table/:id', function(req, res) {
      
      let table_sql = 'SHOW TABLES';
      let table_list = [];
      
      conn.query(table_sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          for(let i=0; i<rows.length; i++){
            for (let j in rows[i]) {
							table_list.push(rows[i][j]);
            }
          }
        }
      });
      
      let table_selected = req.params.table;
      var selectId = req.params.id;
      var sql = `SELECT * FROM ${table_selected} WHERE id=?`;
      conn.query(sql, [selectId], function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          res.render('index6', {
              title: "detail",
              data_arr: rows,
              table_selected: table_selected,
              table_list: table_list
          });
          //이제 테이블 리스트를 전달해서 링크에 넣어주면 된다
        }
      });
    });
    
    app.post('/update/:table', function(req, res) {
      
      let table_selected = req.params.table;
      let target_params = '';
      let target_id = req.body.id;
      let value_params = '';
      let params = [];
      
      for (let j in req.body) {
          params.push(req.body[j]);
          target_params += j + '=?, ';
        }
        
      target_params = target_params.slice(0,-2);
    
      let sql = `UPDATE ${table_selected} SET ${target_params} WHERE id=${target_id}`;
      
      conn.query(sql, params, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          res.redirect('/manage/' + table_selected );
        }
      });
    });
    
    //--------------------필드 입력/출력/제거
    
    app.get('/input_field/:table', function(req,res){
      
      let table_sql = 'SHOW TABLES';
      let table_list = [];
      
      conn.query(table_sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          for(let i=0; i<rows.length; i++){
            for (let j in rows[i]) {
							table_list.push(rows[i][j]);
            }
          }
        }
      });
      
      let table_selected = req.params.table;
      let sql = `SELECT * FROM ${table_selected}`;
      
      conn.query(sql, function(err, rows, fields) {
        if(err){
          console.log(err);
        } else {
          res.render('index_field_input', {
              title: "input",
              data_arr: rows,
              table_selected: table_selected,
              table_list: table_list
          });
        }
      });
    });
    
    app.post('/upload_field/:table', function(req,res){
      let table_selected = req.params.table;
      let fieldname = req.body.fieldname;
      let fieldtype = req.body.fieldtype;
      let sql = `ALTER TABLE ${table_selected} ADD ${fieldname} ${fieldtype} NOT NULL;`;
      console.log('sql 문 :' + sql);
      conn.query(sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          console.log(rows.insertId);
          res.redirect('/manage/' + table_selected);
        }
      });
    });
    
    // 테이블 업로드 할 때 데이터 값이 꼭 있어야 하는건가?
    
    app.get('/delete_field/:table/:fieldname', function(req,res){
      
      let table_selected = req.params.table;
      let fieldname = req.params.fieldname;
      let sql = `ALTER TABLE ${table_selected} DROP ${fieldname}`;
      conn.query(sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          console.log(rows);
          res.redirect('/manage/' + table_selected);
        }
      });
    });
    
    //--------------------테이블 입력/출력/제거
    
    app.get('/input_table', function(req,res){
      let table_sql = 'SHOW TABLES';
      let table_list = [];
      
      conn.query(table_sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          for(let i=0; i<rows.length; i++){
            for (let j in rows[i]) {
							table_list.push(rows[i][j]);
            }
          }
        }
      });
      
      res.render('index_table_input', {
          title: "table_input",
          table_list: table_list
      });
    });
  
    app.post('/upload_table', function(req,res){
      let tablename = req.body.tablename.replace(/(\s*)/g, "");
      let first_table_field = req.body.first_table_field.replace(/(\s*)/g, "");
      let first_table_field_data = req.body.first_table_field_data.replace(/(\s*)/g, "");
      let first_table_field_data_type = req.body.first_table_field_data_type.replace(/(\s*)/g, "");
      //let tabletemplate = req.body.tabletemplate;
      let sql = `CREATE TABLE ${tablename} (
        id int(11) NOT NULL AUTO_INCREMENT,
        ${first_table_field} ${first_table_field_data_type} NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
      
      let sql2 = `INSERT INTO ${tablename} (${first_table_field}) VALUES(?)`
      let params = [first_table_field_data];
      
      conn.query(sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          conn.query(sql2, params, function(err2, rows, fields){
            if(err2){
              console.log(err2);
            } else {
              console.log('work!');
            }
          });
          res.redirect('/manage/'+ tablename);
        }
      });
    });
    
    app.get('/delete_table/:table', function(req,res){
      let table_selected = req.params.table;
      let sql = `DROP TABLE ${table_selected}`;
      conn.query(sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          console.log(rows);
          res.redirect('/manage/bookdata');
        }
      });
    });
    
    // 데이터도 입력하게 해야하네;; 젠장
    
    //-------------------- 검색 페이지
    
    app.get('/search/:table', function(req,res){
      
      let table_selected = req.params.table;
      let table_sql = 'SHOW TABLES';
      let table_list = [];
      
      conn.query(table_sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          for(let i=0; i<rows.length; i++){
            for (let j in rows[i]) {
							table_list.push(rows[i][j]);
            }
          }
        }
      });
      
      let sql = `SELECT * FROM ${table_selected}`;
      conn.query(sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          var label_data = [];
          for(let j in rows[0]) {
            label_data.push(j);
          }

          let id_index = label_data.findIndex(x => x === 'id');

          label_data.splice(id_index, 1);
          
          res.render('index2', {
              title: "search",
              label_data: label_data,
              table_list: table_list,
              table_selected: table_selected
          });
        }
      });
    });
    
    // 검색도 한번에 되게 해야함.
    
    //--------------------검색 결과 페이지
    
    app.post('/search_result/:table/:target', function(req,res){
      let table_sql = 'SHOW TABLES';
      let table_list = [];
      
      conn.query(table_sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          for(let i=0; i<rows.length; i++){
            for (let j in rows[i]) {
							table_list.push(rows[i][j]);
            }
          }
        }
      });
      
      let table_selected = req.params.table;
      let target = req.params.target;
      let row_searched = [];
      console.log(table_selected);
      console.log(target);
      let search_word = req.body.keyword;
      let sql = `SELECT * FROM ${table_selected}`;
      conn.query(sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          console.log(sql);
          for(let i=0; i<rows.length; i++){
            if (rows[i][target].includes(search_word)) {
              row_searched.push(rows[i]);
            }
          }
          res.render('index3', {
              title: "search_result",
              data_arr: row_searched,
              table_selected: table_selected,
              table_list: table_list
          });
        }
      });
    });
    
    //--------------------결과 페이지
    
    app.get('/result/:table', function(req,res){
      
      let table_sql = 'SHOW TABLES';
      let table_list = [];
      
      conn.query(table_sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          for(let i=0; i<rows.length; i++){
            for (let j in rows[i]) {
							table_list.push(rows[i][j]);
            }
          }
        }
      });
      
      let table_selected = req.params.table;
      let sql = `SELECT * FROM ${table_selected}`;
      conn.query(sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          res.render('index3', {
              title: "result",
              data_arr: rows,
              table_selected: table_selected,
              table_list: table_list
          });
        }
      });
    });
    
    //--------------------관리 페이지
    
    app.get('/manage/:table', function(req,res){
      let table_selected = req.params.table;
      let table_sql = 'SHOW TABLES';
      let table_list = [];
      conn.query(table_sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          for(let i=0; i<rows.length; i++){
            for (let j in rows[i]) {
							table_list.push(rows[i][j]);
            }
          }
        }
      });
      
      let sql = `SELECT * FROM ${table_selected}`;
      
      conn.query(sql, function(err, rows, fields){
        if(err){
          console.log(err);
        } else {
          res.render('index4', {
              title: "manage",
              data_arr: rows,
              table_list: table_list,
              table_selected: table_selected
          });
        }
      });
    });
    
    app.get('/detail/:table', function (req, res) {
      res.redirect('/result/' + req.params.table);
    });
    
    /*
    app.post('/detail_search_result', function(req,res){
        var sql = 'SELECT * FROM bookdata';
        conn.query(sql, function(err, rows, fields){
          if(err){
            console.log(err);
          } else {
            for(var i=0; i<rows.length; i++){
              if (rows[i].title.includes(req.body.title_keyword) && rows[i].title.includes(req.body.author_keyword) && rows[i].title.includes(req.body.bookinfo_keyword) && rows[i].title.includes(req.body.ISBM_keyword)) {
                id_arr.push(rows[i].id);
                title_arr.push(rows[i].title);
                author_arr.push(rows[i].author);
                bookinfo_arr.push(rows[i].bookinfo);
                ISBM_arr.push(rows[i].ISBM);
              }
            }
            res.render('index3', {
                title: "search_result",
                data_arr: rows
            });
          }
        });
    });
    */
    
    
    
    // GUI에서 테이블을 여러개 쓸 수 있고 바뀐 테이블 데이터들이 자동으로 구현되도록 만들어야겠다
    
    /*
    // GET ALL BOOKS
    app.get('/api/books', function(req,res){
        Book.find(function(err, books){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(books);
        });
    });

    // GET SINGLE BOOK
    app.get('/api/books/:book_id', function(req, res){
        Book.findOne({_id: req.params.book_id}, function(err, book){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error: 'book not found'});
            res.json(book);
        });
    });
//라우터에 저거 박으면 됨
    // GET BOOK BY AUTHOR
    app.get('/api/books/author/:author', function(req, res){
        Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(404).json({error: 'book not found'});
            res.json(books);
        });
    });

    // CREATE BOOK
    app.post('/api/books', function(req, res){
        var book = new Book();
        book.title = req.body.name;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);
    
        book.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        });
    });

    // UPDATE THE BOOK
    app.put('/api/books/:book_id', function(req, res){
        Book.findById(req.params.book_id, function(err, book){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!book) return res.status(404).json({ error: 'book not found' });
    
            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;
    
            book.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated'});
            });
    
        });
    });

    // DELETE BOOK
    app.delete('/api/books/:book_id', function(req, res){
        Book.remove({ _id: req.params.book_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
    
            여기부터
            ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            주석임
            res.status(204).end();
        });
    });
    */
};

// 생각해보니 vuex를 쓰지 않는 다면 ejs는 vue.js의 훌륭한 모듈화 수단이 되겠군. 아니 잠깐, vuex도 같이 쓰는게 나쁘지 않겠는데?

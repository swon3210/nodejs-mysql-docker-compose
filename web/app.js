// 외부 패키지 IMPORT
const path = require('path');
const express = require('express');
const bodysParser = require('body-parser');

// 라우터 객체 IMPORT
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');

// 데이터베이스 객체 IMPORT
const sequelize = require('./utils/database');

// 데이터베이스 모델 객체 IMPORT
const User = require('./models/user');
const Book = require('./models/book');
const BookShelf = require('./models/book_shelf');
const BookShelfHasBook = require('./models/bridge_model/book_shelf_has_book');
const Library = require('./models/library');
const Post = require('./models/post');

// 스웨거(API 명세 문서) 갹채 IMPORT
const swaggerDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./api_docs/swagger.json');

// Express 객체 생성
const app = express();


// [ 미들웨어 등록 - 요청이 들어올 때마다 실행된다. 단순히 서버가 시작되는 것으로는 실행되지 않는다 ]

// body 필드로 받게 되는 데이터가 JSON 형식으로 가지도록 한다
app.use(bodysParser.json()); 

// 정적 파일의 경로를 프로젝트 경로의 public 폴더로 설정한다
app.use(express.static(path.join(__dirname, 'public')));

// 유저가 아예 한명도 없는지 검사한다.
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      // req 객체에 user 라는 속성을 만들어서 일단 더미 유저 정보를 넣어놓는다. 이때 집어넣는 객체는 단순한 객체가 아니라 sequelize 객체이다.
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    })
  ;
});


// CORS 제어 미들웨어 추가
app.use((req, res, next) => {
  // 응답이 가기전에 헤더를 추가한다. 특정 도메인에만 허용을 해줄 수도, 그냥 다 열어버릴 수도 있다.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // 오리진만 열어주면 안되고, 어떤 HTTP 메서드가 허용되는지도 정해줘야 한다.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  // 데이터 요청이나 권한 요청에 관해서만 허용하도록 한다.
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

// 스웨거(API 명세서) 설정
const swaggerOptions = {
  swaggerDefinition: {
    ...swaggerDocument
  },
  apis: ["routes/*.js"]
}

const swaggerDocs = swaggerDoc(swaggerOptions);

// 라우터 등록
app.use('/admin', adminRoutes);
app.use(clientRoutes)
app.use('/apis', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// 모델 간의 관계 맺기 <- 이거 다른데에 옮겨야겠는데


// USER -< POST
User.hasMany(Post);
Post.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE' // 유저가 지워지면, 포스트들도 지워진다.
});

// USER - LIBRARY
User.hasOne(Library);
Library.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});

// LIBRARY -< BOOKSHELF

Library.hasMany(BookShelf, {
  constraints: true,
  onDelete: 'CASCADE'
})
BookShelf.belongsTo(Library);

// BOOKHELF -< BOOKSHELFHASBOOK -> BOOK

BookShelf.belongsToMany(Book, {
  through: BookShelfHasBook
});
Book.belongsToMany(BookShelf, {
  through: BookShelfHasBook
});

// BOOK - Post
Book.hasMany(Post, {
  force: true
});
Post.belongsTo(Book, {
  force: true,
  constraints: true,
  onDelete: 'CASCADE'
});



// 데이터베이스 연결
sequelize
  .sync({
    // force: true // 그냥 다 덮어씌워버리도록 함.
  })
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      // user 객체는 자기 자신에게 데이터를 넣는 기능은 없다.
      return User.create({
        firstName: "songwon",
        lastName: "Lee",
        email: "swon3210@gmail.com"
      });
    }
    
    // 연결이 되었다면 서버 개방
    app.listen(8080, () => {
      console.log('server is now on http://localhost:8080');
    })
  })
  .catch(err => {
    console.log(err)
  });

const { validationResult } = require('express-validator');


exports.getAdminInfo = (req, res, next) => {
  console.log('hey');
}



// exports.getPosts = (req, res, next) => {
  
//   // 자바스크립트가 JSON 으로 변환되어 전달된다. 
//   res.status(200).json({
//     posts: [
//       { 
//         _id: '1',
//         title: 'First Post', 
//         content: 'This is just the first post!', 
//         imageUrl: 'images/tree.png',
//         creator: {
//           name: 'LEE'
//         }
//        }
//     ]
//   });
// }

// exports.addPost = (req, res, next) => {

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       message: 'Validation failed, entered data is incorrect',
      
//     })
//   }

//   // bodyParser에 의해 body 필드가 추가될 것이다.
//   // Create post in db
//   const title = req.body.title;
//   const content = req.body.content;

//   console.log(title, content);

//   // success and resource is created : 201
//   res.status(201).json({
//     message: 'Post created successfully!',
//     post: {
//       _id: new Date().toISOString(),
//       title: title,
//       content: content,
//       creator: {
//         name: 'LEE 2'
//       },
//       createdAt: new Date()
//     }
//   })
// }
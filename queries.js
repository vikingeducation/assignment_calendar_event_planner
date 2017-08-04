// ----------------------------------------
// Simple Find
// ----------------------------------------

User.find().then(lg);
User.findOne().then(lg);
User.findById(10).then(lg);
User.findAll().then(lg);


// ----------------------------------------
// Attributes
// ----------------------------------------

// Attribute filtering
User.findAll({
  attributes: ['fname', 'lname']
}).then(lg);

// Attribute renaming
User.findAll({
  attributes: [
    ['fname', 'firstName'],
    ['lname', 'lastName']
  ]
}).then(lg);

// Attribute aggregation with group
Post.findAll({
  attributes: [
    [sequelize.fn('COUNT', sequelize.col('userId')), 'userCount']
  ],
  group: '"userId"'
}).then(lg);

Post.findAll({
  attributes: [
    ['COUNT("userId")', 'userCount']
  ],
  group: '"userId"'
}).then(lg);

// Attribute exclude
Post.findAll({
  attributes: { exclude: ['body'] }
}).then(lg);


// ----------------------------------------
// Where
// ----------------------------------------

// Find
Comment.findAll({
  where: { userId: 1 }
}).then(lg);

// Update
Comment.update({
  body: 'Dude! What does mine say?'
}, {
  where: { userId: 1 }
}).then(lg);

Comment.update({
  body: 'Dude! What does mine say?'
}, {
  where: { userId: 1 },
  limit: 1
}).then(lg);

// Destroy
Comment.destroy({
  where: { userId: 1 },
  limit: 1
}).then(lg);


// ----------------------------------------
// Operators
// ----------------------------------------

// Logical
Comment.findAll({
  where: {
    $and: [
      { userId: 100 },
      { postId: 2 }
    ]
  }
}).then(lg);

Comment.findAll({
  where: {
    $or: [
      { userId: 100 },
      { postId: 2 }
    ]
  }
}).then(lg);

// Equality
Comment.findAll({
  where: {
    userId: {
      $lte: 6,
      $gte: 3
    }
  }
}).then(lg);

// Not equal
Comment.findAll({
  where: {
    postId: {
      $ne: 1
    }
  }
}).then(lg);

// Like
User.count({
  where: {
    username: {
      $like: '%1'
    }
  }
}).then(lg);

// Not like
User.count({
  where: {
    username: {
      $notLike: '%1'
    }
  }
}).then(lg);

// In
User.count({
  where: {
    id: {
      $in: [1, 2]
    }
  }
}).then(lg);


// ----------------------------------------
// Pagination/Limiting
// ----------------------------------------

// Limit
Post.findAll({
  limit: 10
}).then(lg);

// Offset
Post.findAll({
  offset: 10,
  limit: 10
}).then(lg);


// ----------------------------------------
// Ordering
// ----------------------------------------

// Ascending
Post.findAll({
  attributes: ['title', 'publishedDate'],
  order: 'publishedDate'
}).then(lg);

// Descending
Post.findAll({
  attributes: ['publishedDate'],
  order: '"publishedDate" DESC',
}).then(lg);

// Multiple
Comment.findAll({
  attributes: ['userId', 'postId'],
  order: [
    ['userId', 'ASC'],
    ['postId', 'DESC']
  ]
}).then(lg);


// ----------------------------------------
// Aggregation
// ----------------------------------------

// Count
Post.count({
  where: {
    userId: 1
  }
}).then(lg);

// Max
Post.max('publishedDate').then(lg);

// Min
Post.min('publishedDate').then(lg);

// Sum
Post.sum('id').then(lg);

// Aggregate
Comment.aggregate('"userId"', 'COUNT', {
  where: { postId: 1 }
}).then(lg);

// With findAll
Post.findAll({
  group: '"userId"',
  attributes: ['userId', [sequelize.fn('COUNT', sequelize.col('userId')), 'count']]
}).then(lg);

Post.findAll({
  group: '"userId"',
  attributes: ['userId', ['COUNT("userId")', 'count']]
}).then(lg);







// ----------------------------------------
// Ignore below this line, not implemented
// ----------------------------------------


// ----------------------------------------
// Associations and JOINs
// ----------------------------------------

// // With findAll on JOIN with include
// Post.findAll({
//   group: ['Comments.postId', 'Post.id'],
//   attributes: [
//     ['id', 'postId'],
//     [sequelize.fn('COUNT', sequelize.col('Comments.postId')), 'commentCount']
//   ],
//   include: [{ model: Comment, attributes: [] }]
// }).then(lg);





// // ----------------------------------------
// // Custom Methods
// // ----------------------------------------

// // Class method
// User.findAllNames().then(lg);

// // Instance method
// User.findById(1).then(u => u.name()).then(lg);
























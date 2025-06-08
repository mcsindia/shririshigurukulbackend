// controllers/userController.js
const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;      
    const limit = parseInt(req.query.limit) || 1; 
    const offset = (page - 1) * limit;

   var querySQL = 'SELECT "UserID","FullName","Email","RoleID","Status","CreatedDate" FROM "adminSite".users ORDER BY "UserID" ASC  LIMIT $1 OFFSET $2;'
    const results = await db.query(querySQL,[limit, offset]);
    console.log('API called, returning users');
    res.send({status:true,data:results.rows});
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

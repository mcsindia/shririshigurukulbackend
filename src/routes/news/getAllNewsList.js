// getAllNewsList
const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let statusFilter = req.query.status === 'Active' ? true
                  : req.query.status === 'Inactive' ? false
                  : 'all';

let querySQL;
let params;

if (statusFilter !== 'all') {
  querySQL = `
    SELECT * FROM "adminSite".news 
    WHERE "status" = $3
    ORDER BY "newsid" ASC  
    LIMIT $1 OFFSET $2;
  `;
  params = [limit, offset, statusFilter];
} else {
  querySQL = `
    SELECT * FROM "adminSite".news 
    ORDER BY "newsid" ASC  
    LIMIT $1 OFFSET $2;
  `;
  params = [limit, offset];
}

const results = await db.query(querySQL, params);

    console.log('API called, returning users');
    res.send({
      status: true,
      data: results.rows
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({
      error: 'Database error'
    });
  }
};
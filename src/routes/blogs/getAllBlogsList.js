// getAllBlogsList
const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const searchText = req.query.search || '';
    let statusFilter = req.query.status === 'Published' ? true
                  : req.query.status === 'Draft' ? false
                  : 'all';

let querySQL;
let params;

if (statusFilter !== 'all') {
  querySQL = `
    SELECT * FROM "adminSite".blogs 
    WHERE "status" = $3 
    AND LOWER("title") LIKE LOWER('%' || $4 || '%')
    ORDER BY "blogid" ASC  
    LIMIT $1 OFFSET $2;
  `;
  params = [limit, offset, statusFilter,searchText];
} else {
  querySQL = `
    SELECT * FROM "adminSite".blogs 
    WHERE LOWER("title") LIKE LOWER('%' || $3 || '%')
    ORDER BY "blogid" ASC  
    LIMIT $1 OFFSET $2;
  `;
  params = [limit, offset,searchText];
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
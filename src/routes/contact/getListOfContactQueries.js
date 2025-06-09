// getListOfContactQueries
const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const searchText = req.query.search || '';
   
let querySQL;
let params;

var fromDate = req.query.fromDate;
var toDate = req.query.toDate;
if (fromDate || toDate) {
  querySQL = `
    SELECT * FROM "adminSite".contact_us 
    WHERE LOWER("name") LIKE LOWER('%' || $3 || '%')
    ${fromDate ? `AND "submitted_at" >= $4` : ''}
    ${toDate ? `AND "submitted_at" <= $${fromDate ? 5 : 4}` : ''}
    ORDER BY "contact_id" ASC  
    LIMIT $1 OFFSET $2;
  `;

  params = [limit, offset, searchText];
  if (fromDate) params.push(fromDate);
  if (toDate) params.push(toDate);
} else {
  querySQL = `
    SELECT * FROM "adminSite".contact_us 
    WHERE LOWER("name") LIKE LOWER('%' || $3 || '%')
    ORDER BY "contact_id" ASC  
    LIMIT $1 OFFSET $2;
  `;

  params = [limit, offset, searchText];
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
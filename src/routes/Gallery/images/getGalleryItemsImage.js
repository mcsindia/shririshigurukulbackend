// getGalleryItemsImage
const db = require('../../../db');

module.exports = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;


let querySQL;

  querySQL = `
    SELECT * FROM "adminSite".image_gallery_items
    ORDER BY "item_id" ASC  
    LIMIT $1 OFFSET $2;
  `;
 
const results = await db.query(querySQL,[limit, offset]);

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
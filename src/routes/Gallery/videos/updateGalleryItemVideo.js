// updateGalleryItemVideo
const db = require('../../../db');

module.exports = async (req, res) => {
  try {

    const {video_url, video_title, video_description, video_date, video_collection_id} = req.body;
    if (req.params.id && req.params.id != null && req.params.id != undefined && req.params.id > 0) {
      var videoID = req.params.id
    } else {
      res.send({
        status: false,
        msg: "ID is required"
      })
    }

    var UpdatedDate = new Date()

  const query = `
    UPDATE "adminSite".video_gallery_items
    SET "video_url" = $1,
        "video_title" = $2,
        "video_description" = $3,
        "video_date" = $4,
        "updated_at" =$5
    WHERE "video_items_id" = $6 AND "video_collection_id" =$7
    RETURNING *;
  `;

    const results = await db.query(query, [video_url, video_title, video_description, video_date,UpdatedDate,videoID, video_collection_id]);
    res.send({status:true,data:results.rows[0]});
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

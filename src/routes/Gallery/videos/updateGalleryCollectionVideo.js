//updateGalleryCollectionVideo

const db = require('../../../db');

module.exports = async (req, res) => {
  try {

      const { Title,Description ,videoDate} = req.body;

    if (req.params.id && req.params.id != null && req.params.id != undefined && req.params.id > 0) {
      var videoID = req.params.id
    } else {
      res.send({
        status: false,
        msg: "ID is required"
      })
    }

      
    let Image;

    if(req.file){
    const fileName = req.file.filename;
    Image = `${req.protocol}://${req.get('host')}/uploads/website/Gallery/videos/${fileName}`;
     }else{
        Image = req.body.image;
    }

    var UpdatedDate = new Date()

    const query = `

        UPDATE "adminSite".video_gallery_collections
        SET "thumbnail_img" = $1,
        "title" = $2,
        "description" = $3,
        "video_date"=$4,
        "updated_at"=$5
        WHERE "video_collection_id" = $6
        RETURNING *;
    `;

    const results = await db.query(query, [Image,Title,Description ,videoDate, UpdatedDate, videoID]);
    res.status(201).send({
      status: true,
      data: results.rows[0]
    });

  } catch (err) {
    console.error('Error updating video:', err);
    res.status(500).json({
      error: 'Database error'
    });
  }
};
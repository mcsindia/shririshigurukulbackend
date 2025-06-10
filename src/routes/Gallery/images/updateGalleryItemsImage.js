//updateGalleryItemsImage

const db = require('../../../db');

module.exports = async (req, res) => {
  try {

     const { Title,
            collectionID} = req.body;


    if (!req.file) {
      return res.status(400).json({
        error: 'Image file is required'
      });
    }

    if (req.params.id && req.params.id != null && req.params.id != undefined && req.params.id > 0) {
      var imageID = req.params.id
    } else {
      res.send({
        status: false,
        msg: "ID is required"
      })
    }

    const fileName = req.file.filename;
    const Image = `${req.protocol}://${req.get('host')}/uploads/website/Gallery/images/${fileName}`;

    var UpdatedDate = new Date()

    const query = `

        UPDATE "adminSite".image_gallery_items
        SET "image_path" = $1,
        "image_title" = $2,
        "updated_at"=$3
        WHERE "item_id" = $4 AND "collection_id"=$5
        RETURNING *;
    `;

    const results = await db.query(query, [Image,Title,UpdatedDate, imageID,collectionID]);
    res.status(201).send({
      status: true,
      data: results.rows[0]
    });

  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({
      error: 'Database error'
    });
  }
};
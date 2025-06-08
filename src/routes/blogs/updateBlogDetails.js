//updateBlogDetails

const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const Title = req.body.Title;

    const PublishDate = req.body.PublishDate;
    const Description = req.body.Description;
    const Status = req.body.Status;


    if (!req.file) {
      return res.status(400).json({
        error: 'Image file is required'
      });
    }

    if (req.params.id && req.params.id != null && req.params.id != undefined && req.params.id > 0) {
      var blogID = req.params.id
    } else {
      res.send({
        status: false,
        msg: "ID is required"
      })
    }

    const fileName = req.file.filename;
    const Image = `${req.protocol}://${req.get('host')}/uploads/website/blogs/${fileName}`;

    var UpdatedDate = new Date()

    const query = `

        UPDATE "adminSite".blogs
        SET "image" = $1,
        "title" = $2,
        "description" = $3,
        "publish_date"=$4,
        "status"=$5,
        "updated_at"=$6
        WHERE "blogid" = $7
        RETURNING *;
    `;

    const results = await db.query(query, [Image,Title,Description ,PublishDate,Status, UpdatedDate, blogID]);
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
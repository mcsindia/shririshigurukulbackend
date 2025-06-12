const db = require('../../db');

module.exports = async (req, res) => {
  try {
    console.log('updateNews API hit');

    const {
      Title,
      Slug,
      Description,
      Status
    } = req.body;

    if (req.params.id && req.params.id != null && req.params.id != undefined && req.params.id > 0) {
      var newsID = req.params.id
    } else {
      res.send({
        status: false,
        msg: "ID is required"
      })
    }

    let Image;

    if(req.file){
    const fileName = req.file.filename;
    Image = `${req.protocol}://${req.get('host')}/uploads/website/news/${fileName}`;
    }else{
      Image = req.body.image;
    }

    var UpdatedDate = new Date()

    const query = `

        UPDATE "adminSite".news
        SET "image" = $1,
        "title" = $2,
        "slug" = $3,
        "description" = $4,
        "status" =$5,
        "updated_at" = $6
        WHERE "newsid" = $7
        RETURNING *;
    `;

    const results = await db.query(query, [Image, Title, Slug, Description, Status, UpdatedDate, newsID]);
    res.status(201).send({
      status: true,
      data: results.rows[0]
    });

  } catch (err) {
    console.error('Error updating news:', err);
    res.status(500).json({
      error: 'Database error'
    });
  }
};
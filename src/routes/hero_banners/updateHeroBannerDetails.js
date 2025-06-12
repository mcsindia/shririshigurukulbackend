//updateHeroBannerDetails

const db = require('../../db');

module.exports = async (req, res) => {
  try {

   const { Title,Subtitle,cta_text,cta_link,Status,Order } = req.body;

    if (req.params.id && req.params.id != null && req.params.id != undefined && req.params.id > 0) {
      var heroBannerID = req.params.id
    } else {
      res.send({
        status: false,
        msg: "ID is required"
      })
    }

    let Image;

    if(req.file){
    const fileName = req.file.filename;
    Image = `${req.protocol}://${req.get('host')}/uploads/website/hero_banners/${fileName}`;
    }else{
        Image = req.body.image;
    }

    var UpdatedDate = new Date()

    const query = `

        UPDATE "adminSite".hero_banners
        SET "image" = $1,
        "title" = $2,
        "subtitle" = $3,
        "cta_text"=$4,
        "cta_link"=$5,
        "status"=$6,
        "display_order"=$7,
        "updated_at"=$8
        WHERE "herobannerid" = $9
        RETURNING *;
    `;

    const results = await db.query(query, [Image,Title,Subtitle,cta_text,cta_link,Status,Order, UpdatedDate, heroBannerID]);
    res.status(201).send({
      status: true,
      data: results.rows[0]
    });

  } catch (err) {
    console.error('Error updating banner:', err);
    res.status(500).json({
      error: 'Database error'
    });
  }
};
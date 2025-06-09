//insertGalleryCollectionImage

const db = require('../../../db');

module.exports = async (req, res) => {
  try {

    const { Title,Description ,imageDate} = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const fileName = req.file.filename;
    const Image = `${req.protocol}://${req.get('host')}/uploads/website/Gallery/images/${fileName}`;

    const query = `
      INSERT INTO "adminSite".image_gallery_collections ("thumbnail_img", "title","description","image_date")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const results = await db.query(query, [Image, Title,Description ,imageDate]);
    res.status(201).send({ status: true, data: results.rows[0] });

  } catch (err) {
    console.error('Error inserting image:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

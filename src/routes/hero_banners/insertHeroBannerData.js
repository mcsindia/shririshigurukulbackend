//insertHeroBannerData

const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const { Title,Subtitle,cta_text,cta_link,Status,Order } = req.body;


    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const fileName = req.file.filename;
    const Image = `${req.protocol}://${req.get('host')}/uploads/website/hero_banners/${fileName}`;

    const query = `
      INSERT INTO "adminSite".hero_banners ("image", "title","subtitle","cta_text","cta_link", "status","display_order")
      VALUES ($1, $2, $3, $4, $5,$6,$7)
      RETURNING *;
    `;

    const results = await db.query(query, [Image, Title,Subtitle,cta_text,cta_link,Status,Order]);
    res.status(201).send({ status: true, data: results.rows[0] });

  } catch (err) {
    console.error('Error inserting news:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

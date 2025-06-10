//insertGalleyItemVideo

const db = require('../../../db');

module.exports = async (req, res) => {
  try {

     const items = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Request body must be a non-empty array.' });
  }

    const inserted = [];

    for (const item of items) {
      const { video_url, video_title, video_collection_id } = item;

      const query = `
        INSERT INTO "adminSite".video_gallery_items
        (video_url, video_title, video_collection_id)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;

      const result = await db.query(query, [
        video_url,
        video_title,
        video_collection_id
      ]);

      inserted.push(result.rows[0]);
    }

    res.status(201).json({ status: true, data: inserted });

  } catch (err) {
    console.error('Error inserting image:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

const db = require('../../db');

module.exports = async (req, res) => {
  try {
    console.log( 'insertNews API hit');

    const { Title, Slug, Description, Status } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const fileName = req.file.filename;
    const proto = req.headers['x-forwarded-proto'] || req.protocol;
    const Image = `${proto}://${req.get('host')}/uploads/website/news/${fileName}`;

    console.log('Image URL:', Image);

    const query = `
      INSERT INTO "adminSite".news ("image", "title", "slug", "description", "status")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const results = await db.query(query, [Image, Title, Slug, Description, Status]);
    res.status(201).send({ status: true, data: results.rows[0] });

  } catch (err) {
    console.error('Error inserting news:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

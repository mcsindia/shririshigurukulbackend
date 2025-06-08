//insertBlogData

const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const { Title,PublishDate,Description ,Status } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const fileName = req.file.filename;
    const Image = `${req.protocol}://${req.get('host')}/uploads/website/blogs/${fileName}`;

    const query = `
      INSERT INTO "adminSite".blogs ("image", "title","publish_date","description", "status")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const results = await db.query(query, [Image, Title, PublishDate, Description, Status]);
    res.status(201).send({ status: true, data: results.rows[0] });

  } catch (err) {
    console.error('Error inserting news:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

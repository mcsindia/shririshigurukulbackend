//insertEventsData
const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const { Title,Description, Location,Organiser,EventDate,Status } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const fileName = req.file.filename;
    const Image = `${req.protocol}://${req.get('host')}/uploads/website/events/${fileName}`;

    const query = `
      INSERT INTO "adminSite".events ("image", "title", "description","location","organiser","event_date", "status")
      VALUES ($1, $2, $3, $4, $5,$6,$7)
      RETURNING *;
    `;

    const results = await db.query(query, [Image, Title,Description, Location,Organiser,EventDate,Status]);
    res.status(201).send({ status: true, data: results.rows[0] });

  } catch (err) {
    console.error('Error inserting news:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

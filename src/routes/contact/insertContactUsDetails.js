// insertContactUsDetails
const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const { Name, Phone,Message,Status,Subject} = req.body;

    const ip = req.ip || req.connection.remoteAddress;

  const query = `
    INSERT INTO "adminSite".contact_us ("name", "phone","message","status","ip_address","subject")
    VALUES ($1, $2, $3,$4,$5,$6)
    RETURNING *;
  `;

    const results = await db.query(query, [ Name, Phone,Message,Status,ip,Subject]);
    res.send({status:true,data:results.rows[0]});
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

// insertNewGurukulUser
const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const { FullName, Email,RoleID,Status} = req.body;

  const query = `
    INSERT INTO "adminSite".users ("FullName", "Email","RoleID","Status")
    VALUES ($1, $2, $3,$4)
    RETURNING *;
  `;

    const results = await db.query(query, [FullName, Email,RoleID,Status]);
    res.send({status:true,data:results.rows[0]});
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

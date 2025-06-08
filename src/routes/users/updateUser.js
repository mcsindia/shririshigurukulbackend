// updateUser
const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const { FullName, Email,RoleID,Status} = req.body;
    if(req.body.UserID && req.body.UserID !=null && req.body.UserID !=undefined && req.body.UserID>0){
    var userID = req.body.UserID
    }else{
        res.send({status:false,msg:"User ID is required"})
    }

    var UpdatedDate = new Date()

  const query = `
    UPDATE "adminSite".users
    SET "FullName" = $1,
        "Email" = $2,
        "RoleID" = $3,
        "Status" = $4,
        "UpdatedDate" =$5
    WHERE "UserID" = $5
    RETURNING *;
  `;

    const results = await db.query(query, [FullName, Email,RoleID,Status,userID,UpdatedDate]);
    res.send({status:true,data:results.rows[0]});
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

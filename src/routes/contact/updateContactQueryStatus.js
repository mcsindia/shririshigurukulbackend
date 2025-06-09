// updateContactQueryStatus
const db = require('../../db');

module.exports = async (req, res) => {
    try {

        const {
            status,
            Remark
        } = req.body;
        if (req.params.id && req.params.id != null && req.params.id != undefined && req.params.id > 0) {
            var contactID = req.params.id
        } else {
            res.send({
                status: false,
                msg: "ID is required"
            })
        }

        var UpdatedDate = new Date();
        let params;
        var query;
        if (Remark && Remark.length > 0 && Remark != null) {
            query = `
                UPDATE "adminSite".contact_us
                SET "status" = $1,
                    "remark" =$2,
                    "updated_at" =$3
                WHERE "contact_id" = $4
                RETURNING *;
            `;
            params = [status, Remark, UpdatedDate, contactID]
        }else{
             query = `
                UPDATE "adminSite".contact_us
                SET "status" = $1,
                    "updated_at" =$2
                WHERE "contact_id" = $3
                RETURNING *;
            `;
            params = [status, UpdatedDate, contactID]
        }

        const results = await db.query(query, params);
        res.send({
            status: true,
            data: results.rows[0]
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({
            error: 'Database error'
        });
    }
};
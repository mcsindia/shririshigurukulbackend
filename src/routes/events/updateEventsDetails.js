//updateEventsDetails

const db = require('../../db');

module.exports = async (req, res) => {
  try {

    const { Title,Description, Location,Organiser,EventDate,Status } = req.body;

    if (req.params.id && req.params.id != null && req.params.id != undefined && req.params.id > 0) {
      var eventID = req.params.id
    } else {
      res.send({
        status: false,
        msg: "ID is required"
      })
    }

    
    let Image;

    if(req.file){
    const fileName = req.file.filename;
    Image = `${req.protocol}://${req.get('host')}/uploads/website/events/${fileName}`;
    }else{
       Image = req.body.image;
    }

    var UpdatedDate = new Date()

    const query = `

        UPDATE "adminSite".events
        SET "image" = $1,
        "title" = $2,
        "description" = $3,
        "location" =$4,
        "organiser" = $5,
        "event_date"=$6,
        "status"=$7,
        "updated_at"=$8
        WHERE "eventid" = $9
        RETURNING *;
    `;

    const results = await db.query(query, [Image,Title,Description, Location,Organiser,EventDate,Status, UpdatedDate, eventID]);
    res.status(201).send({
      status: true,
      data: results.rows[0]
    });

  } catch (err) {
    console.error('Error updating news:', err);
    res.status(500).json({
      error: 'Database error'
    });
  }
};
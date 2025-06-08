// deleteEvents
const db = require('../../db');

module.exports = async (req, res) => {
    try {
    const eventsId = parseInt(req.params.id);

    if (isNaN(eventsId)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    const querySQL = `DELETE FROM "adminSite".events WHERE "eventid" = $1`;
    await db.query(querySQL, [eventsId]);

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
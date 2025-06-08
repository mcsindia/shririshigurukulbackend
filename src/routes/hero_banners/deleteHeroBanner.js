// deleteHeroBanner
const db = require('../../db');

module.exports = async (req, res) => {
    try {
    const heroBannerId = parseInt(req.params.id);

    if (isNaN(heroBannerId)) {
      return res.status(400).json({ message: 'Invalid hero banner ID' });
    }

    const querySQL = `DELETE FROM "adminSite".hero_banners WHERE "herobannerid" = $1`;
    await db.query(querySQL, [heroBannerId]);

    res.status(200).json({ message: 'Hero banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting Hero banner:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
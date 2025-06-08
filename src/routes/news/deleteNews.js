// deleteNews
const db = require('../../db');

module.exports = async (req, res) => {
    try {
    const newsId = parseInt(req.body.id);

    if (isNaN(newsId)) {
      return res.status(400).json({ message: 'Invalid news ID' });
    }

    const querySQL = `DELETE FROM "adminSite".news WHERE "newsid" = $1`;
    await db.query(querySQL, [newsId]);

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
// deleteGalleryItemVideo
const db = require('../../../db');

module.exports = async (req, res) => {
    try {
    const videoId = parseInt(req.params.id);

    if (isNaN(videoId)) {
      return res.status(400).json({ message: 'Invalid collection video ID' });
    }

    const querySQL = `DELETE FROM "adminSite".video_gallery_items WHERE "video_items_id" = $1`;
    await db.query(querySQL, [videoId]);

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting Collection:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
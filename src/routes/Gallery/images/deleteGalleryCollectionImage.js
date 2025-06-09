// deleteGalleryCollectionImage
const db = require('../../../db');

module.exports = async (req, res) => {
    try {
    const imageId = parseInt(req.params.id);

    if (isNaN(imageId)) {
      return res.status(400).json({ message: 'Invalid collection image ID' });
    }

    const querySQL = `DELETE FROM "adminSite".image_gallery_collections WHERE "collection_id" = $1`;
    await db.query(querySQL, [imageId]);

    res.status(200).json({ message: 'Collection deleted successfully' });
  } catch (error) {
    console.error('Error deleting Collection:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
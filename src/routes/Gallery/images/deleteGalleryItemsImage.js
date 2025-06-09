// deleteGalleryItemsImage
const db = require('../../../db');

module.exports = async (req, res) => {
    try {
    const imageId = parseInt(req.params.id);

    if (isNaN(imageId)) {
      return res.status(400).json({ message: 'Invalid item image ID' });
    }

    const querySQL = `DELETE FROM "adminSite".image_gallery_items WHERE "item_id" = $1`;
    await db.query(querySQL, [imageId]);

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting Image:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
// deleteBlogs
const db = require('../../db');

module.exports = async (req, res) => {
    try {
    const blogId = parseInt(req.params.id);

    if (isNaN(blogId)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    const querySQL = `DELETE FROM "adminSite".blogs WHERE "blogid" = $1`;
    await db.query(querySQL, [blogId]);

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
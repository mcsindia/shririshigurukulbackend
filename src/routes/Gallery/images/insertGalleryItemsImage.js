//insertGalleryItemsImage

const db = require('../../../db');

module.exports = async (req, res) => {
    try {

        const {
            Title,
            collectionID
        } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                error: 'No image files uploaded'
            });
        }

        const titles = Array.isArray(Title) ? Title : [Title];
        const collectionIds = Array.isArray(collectionID) ? collectionID : [collectionID];

        const results = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const fileName = file.filename;
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/website/${req.uploadType}/${fileName}`;

            const query = `
      INSERT INTO "adminSite".image_gallery_items
      ("image_path", "image_title", "collection_id")
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

            const result = await db.query(query, [
                imageUrl,
                titles[i] || '',
                collectionIds[i] || null
            ]);

            results.push(result.rows[0]);
        }

        res.status(201).send({
            status: true,
            data: results
        });

    } catch (err) {
        console.error('Error inserting image:', err);
        res.status(500).json({
            error: 'Database error'
        });
    }
};
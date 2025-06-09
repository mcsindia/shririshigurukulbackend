//insertGalleryItemsImage

const db = require('../../../db');

module.exports = async (req, res) => {
    try {

        const {
            Title,
            Description,
            imageDate,
            collectionID
        } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                error: 'No image files uploaded'
            });
        }

        const titles = Array.isArray(Title) ? Title : [Title];
        const descriptions = Array.isArray(Description) ? Description : [Description];
        const dates = Array.isArray(imageDate) ? imageDate : [imageDate];
        const collectionIds = Array.isArray(collectionID) ? collectionID : [collectionID];

        const results = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const fileName = file.filename;
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/website/${req.uploadType}/${fileName}`;

            const query = `
      INSERT INTO "adminSite".image_gallery_items
      ("image_path", "image_title", "image_description", "image_date", "collection_id")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

            const result = await db.query(query, [
                imageUrl,
                titles[i] || '',
                descriptions[i] || '',
                dates[i] || null,
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
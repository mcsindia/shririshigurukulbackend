// updateUser
const db = require('../../db');
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const query = `
//     INSERT INTO "adminSite".users ("FullName", "Email","RoleID","Status","userName","password")
//     VALUES ($1, $2, $3,$4,$5,$6)
//     RETURNING *;
//   `;

//         const results = await db.query(query, ['Nikhil', 'nikhil@gmail.com', '2', 'true', email, hashedPassword]);

        const fetchQuery = `
  SELECT * FROM "adminSite".users WHERE "userName" = $1;
`;

        const result = await db.query(fetchQuery, [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const SECRET_KEY = process.env.JWT_SECRET || 'your_default_secret_key';
        const token = jwt.sign({
            email: user.userName,
            userId: user.UserID
        }, SECRET_KEY, {
            expiresIn: '24h',
        });

        return res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({
            error: 'Database error'
        });
    }
}
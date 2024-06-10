// // routes/bookings.js
// const express = require('express');
// const router = express.Router();
// const Booking = require('./record');

// router.post('/book', async (req, res) => {
//     console.log(req.body); // Логирование данных, полученных из запроса
//     const { userId, date, time, service , portfolioId} = req.body;

//     try {
//         const newBooking = new Booking({
//             userId,
//             date,
//             time,
//             service,
//             portfolioId
//         });

//         await newBooking.save();
//         res.status(201).send('Booking created successfully');
//     } catch (error) {
//         console.log(error); // Логирование ошибки, если она возникает
//         res.status(500).send('Server error');
//     }
// });

const Router = require("express");
const postController = require("./postController.js");
const portfolioController = require("./portfolioController.js");
const router = new Router();
const Booking = require('./record');

// router.post("/posts", checkRole('ADMIN'), postController.create);
router.post("/posts", postController.create);
router.get("/posts", postController.getAll);
router.get("/posts/:id", postController.getOne);
router.put("/posts", postController.update);
router.delete("/posts/:id", postController.delete);

router.post("/portfolios", portfolioController.create);
router.get("/portfolios", portfolioController.getAll);
router.get("/portfolios/:id", portfolioController.getOne);
router.put("/portfolios", portfolioController.update);
router.delete("/portfolios/:id", portfolioController.delete);

router.post('/book', async (req, res) => {
    const { userId, date, time, service, portfolioId } = req.body;

    try {
        const existingBooking = await Booking.findOne({ date, time, portfolioId });

        if (existingBooking) {
            // Если запись уже существует, возвращаем сообщение об ошибке
            return res.status(400).send('Это время уже занято. Выберите другое время.');
        }

        // Создаем новую запись, если такой нет
        const newBooking = new Booking({
            userId,
            date,
            time,
            service,
            portfolioId
        });

        await newBooking.save();
        res.status(201).send('Booking created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }});

// router.get('/bookings', async (req, res) => {
//     const { date } = req.query;

//     try {
//         // Ищем все записи, у которых поле date соответствует выбранной дате
//         const bookings = await Booking.find({ date });

//         res.json(bookings);
//     } catch (error) {
//         console.error('Ошибка при получении списка записей:', error);
//         res.status(500).send('Ошибка сервера');
//     }
// });
  

module.exports = router;

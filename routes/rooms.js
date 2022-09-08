const router = require("express").Router();
const Room = require('../models/Room')

// route to the rooms index.hbs view
router.get('/rooms', (req, res, next) => {
    // this only displays the rooms of the logged in user
    // console.log(req.session)
    Room.find({ owner: req.session.user._id })
        .then(rooms => {
            res.render('rooms/index', { rooms })
        })
        .catch(err => next(err))
});

// route to add rooms
router.get('/rooms/add', (req, res, next) => {
    res.render('rooms/add')
})

router.post('/rooms', (req, res, next) => {
    const { name, price } = req.body
    // create a room
    // console.log(req.session.user._id);
    const loggedInUser = req.session.user._id
    Room.create({ name, price, owner: loggedInUser })
        .then(() => {
            res.redirect('/rooms')
        })
        .catch(err => next(err))
});

router.get('/rooms/:id/delete', (req, res, next) => {
	// if you are an admin you can delete any room
	// uf you are a user you can only delete the rooms
	// that you have created
    // console.log(req.user);
	const roomId = req.params.id
	const query = { _id: roomId }
	if (req.session.user.role === 'user') {
		query.owner = req.user._id
	}
	Room.findOneAndDelete(query)
		.then(() => {
			res.redirect('/rooms')
		})
		.catch(err => next(err))
});

module.exports = router;
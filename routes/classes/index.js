const router = require('express').Router();
const storage = require('../../components/general-storage');

router.get('/', (req, res) => {
  res.json( storage.get('classes') );
})

module.exports = router;

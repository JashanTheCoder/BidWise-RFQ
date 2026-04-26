const User = require('../models/User');
const RFQ = require('../models/RFQ');
const Bid = require('../models/Bid');

// GET /api/admin/stats
exports.getStats = async (req, res) => {
  try {
    const [users, rfqs, bids] = await Promise.all([
      User.countDocuments(),
      RFQ.countDocuments(),
      Bid.countDocuments(),
    ]);
    const activeRFQs = await RFQ.countDocuments({ status: 'active' });
    res.json({ success: true, stats: { users, rfqs, bids, activeRFQs } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const query = role ? { role } : {};
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await User.countDocuments(query);
    res.json({ success: true, users, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/admin/users/:id
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/admin/rfqs
exports.getAllRFQs = async (req, res) => {
  try {
    const rfqs = await RFQ.find()
      .populate('buyer', 'name company')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ success: true, rfqs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

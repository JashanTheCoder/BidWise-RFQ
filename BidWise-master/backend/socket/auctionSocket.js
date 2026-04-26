const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RFQ = require('../models/RFQ');

module.exports = (io) => {
  // Auth middleware for socket
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication required'));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return next(new Error('User not found'));
      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.user?.name} (${socket.id})`);

    // Join RFQ room for live bidding
    socket.on('rfq:join', async ({ rfqId }) => {
      socket.join(rfqId);
      console.log(`${socket.user.name} joined RFQ room: ${rfqId}`);
      socket.to(rfqId).emit('rfq:userJoined', { user: socket.user.name });
    });

    // Leave RFQ room
    socket.on('rfq:leave', ({ rfqId }) => {
      socket.leave(rfqId);
    });

    // RFQ: auction time extension notification
    socket.on('rfq:extensionCheck', ({ rfqId }) => {
      io.to(rfqId).emit('rfq:extensionAlert', { rfqId, message: 'Checking extension...' });
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Socket disconnected: ${socket.user?.name}`);
    });
  });
};

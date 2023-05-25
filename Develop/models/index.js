const User = require('./User');
const Project = require('./workout');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Workout };

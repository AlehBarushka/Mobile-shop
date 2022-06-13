const sequelize = require('../index');
const { DataTypes } = require('sequelize');

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define('basket_device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Device = sequelize.define('device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const DeviceInfo = sequelize.define('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

Basket.belongsTo(User);
Basket.hasMany(BasketDevice);

BasketDevice.belongsTo(Basket);
BasketDevice.belongsTo(Device);

Brand.hasMany(Device);
Brand.belongsToMany(Type, { through: TypeBrand });

Device.hasMany(DeviceInfo);
Device.belongsTo(Type);
Device.belongsTo(Brand);
Device.hasMany(Rating);
Device.hasMany(BasketDevice);

DeviceInfo.belongsTo(Device);

Rating.belongsTo(User);
Rating.belongsTo(Device);

Type.hasMany(Device);
Type.belongsToMany(Brand, { through: TypeBrand });

User.hasOne(Basket);
User.hasMany(Rating);

module.exports = { User, Device, DeviceInfo, Type, Rating, Brand, Basket, BasketDevice };

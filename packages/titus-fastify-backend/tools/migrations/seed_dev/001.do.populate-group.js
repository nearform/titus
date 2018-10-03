'use strict'

module.exports.generateSql = function () {
  return `
  INSERT INTO food_group (name) values
  ('Dairy and Egg Products'),
  ('Spices and Herbs'),
  ('Baby Foods'),
  ('Fats and Oils'),
  ('Poultry Products'),
  ('Soups, Sauces, and Gravies'),
  ('Sausages and Luncheon Meats'),
  ('Breakfast Cereals'),
  ('Snacks'),
  ('Fruits and Fruit Juices'),
  ('Pork Products'),
  ('Vegetables and Vegetable Products'),
  ('Nut and Seed Products'),
  ('Beef Products'),
  ('Beverages'),
  ('Finfish and Shellfish Products'),
  ('Legumes and Legume Products'),
  ('Lamb, Veal, and Game Products'),
  ('Baked Products'),
  ('Sweets'),
  ('Cereal Grains and Pasta'),
  ('Fast Foods'),
  ('Meals, Entrees, and Side Dishes'),
  ('American Indian/Alaska Native Foods'),
  ('Restaurant Foods')

    `
}

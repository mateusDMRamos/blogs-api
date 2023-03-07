const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {},
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost,
      { 
        foreignKey: 'categoryId', 
        as: 'posts',
        through: PostCategory,
        otherKey: 'postId'
      });
    models.BlogPost.belongsToMany(models.Category,
      { 
        foreignKey: 'postId', 
        as: 'categories',
        through: PostCategory,
        otherKey: 'categoryId'
      });
  }

  return PostCategory;
};

module.exports = PostCategoryModel;
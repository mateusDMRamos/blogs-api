const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, foreingKey: true },
    categoryId: { type: DataTypes.INTEGER, foreingKey: true },
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost,
      { 
        foreingKey: 'post_id', 
        as: 'posts',
        through: PostCategory,
        otherKey: 'category_id'
      });
    models.BlogPost.belongsToMany(models.Category,
      { 
        foreingKey: 'category_id', 
        as: 'categories',
        through: PostCategory,
        otherKey: 'post_id'
      });
  }

  return PostCategory;
};

module.exports = PostCategoryModel;
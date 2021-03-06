import { articles } from "../config/init.data";

module.exports = (sequelize, DataType) => {
   const Articles = sequelize.define('Articles', {
      id_post: {
         type: DataType.UUID,
         primaryKey: true,
         defaultValue: DataType.UUIDV1,
      },
      sku: {
         type: DataType.STRING(17),
         allowNull: false,
         validate: {
            notEmpty: {
               args: true
            },
            len: {
               args: [1, 17]
            }
         }
      },
      title: {
         type: DataType.STRING(256),
         allowNull: false,
         validate: {
            notEmpty: {
               args: true
            },
            len: {
               args: [1, 17]
            }
         }
      },
      price: {
         type: DataType.DECIMAL(10, 2),
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      stock: {
         type: DataType.DECIMAL(10, 2),
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      active: {
         type: DataType.BOOLEAN,
         allowNull: false,
         defaultValue: false
      },
      description: {
         type: DataType.TEXT,
      },
      preview: {
         type: DataType.STRING(256),
         allowNull: false,
         validate: {
            notEmpty: {
               args: true
            },
            len: {
               args: [10, 256]
            }
         }
      },

   }, {
      tableName: 'articles',
      hooks: {
         // executed "after" `Model.sync(...)`
         afterSync: function (options) {
            // this = Model Load Fake data
            this.bulkCreate(articles);
         }
      },
      indexes: [
         // Add a FULLTEXT index [MATCH AGAINST ALGORITHM]
         {
            type: 'FULLTEXT',
            name: 'text_idx',
            fields: ['description', 'title', 'sku']
         }
      ]
   });

   /*Create foreign keys and associations between models*/
   Articles.associate = (models) => {

      /*A article has a category*/
      Articles.belongsTo(models.Categories, {foreignKey: 'category_id', foreignKeyConstraint: true});

      /*A article has many pictures*/
      Articles.hasMany(models.Pictures, {foreignKey: 'article_id', foreignKeyConstraint: true});

   };


   return Articles;
};
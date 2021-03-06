import { pictures } from "../config/init.data";

module.exports = (sequelize, DataType) => {
   const Picture = sequelize.define('Pictures', {
      id_picture: {
         type: DataType.UUID,
         primaryKey: true,
         defaultValue: DataType.UUIDV1,
      },
      url: {
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
      thumbnail: {
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
      }
   }, {
      tableName: 'article_pictures',
      hooks: {
         // executed "after" `Model.sync(...)`
         afterSync: function (options) {
            // this = Model Load Fake Data
            this.bulkCreate(pictures);
         }
      }
   });

   /*Create foreign keys and associations between models*/
   Picture.associate = (models) => {

      /*A image has a post*/
      Picture.belongsTo(models.Articles, {foreignKey: 'article_id', foreignKeyConstraint: true});
   };

   return Picture;
};
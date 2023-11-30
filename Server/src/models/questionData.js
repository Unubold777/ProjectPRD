const { DataTypes, Model } = require("sequelize");
const db = require("../services/database");
const moment = require('moment');
const RequestData = require("./requestData");

class QuestionData extends Model {}

QuestionData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    request_id:{
        type: DataTypes.INTEGER,
        references:{
            model:RequestData,
            key:'id'
        },
    },
    submittedDate:{
        type: DataTypes.DATE
    },
    answer1:{
        type: DataTypes.STRING(100),
    },
    answer2:{
        type: DataTypes.STRING(100),
    },
    answer3:{
        type: DataTypes.STRING(100),
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue("createdAt")).format(
          "YYYY/MM/DD HH:mm"
        );
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    modelName: 'questionData',
    tableName: 'questionData', 
        freezeTableName: true,
  }
);

QuestionData.belongsTo(RequestData, {
  foreignKey: 'request_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = QuestionData;

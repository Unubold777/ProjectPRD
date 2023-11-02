const { DataTypes, Model } = require("sequelize");
const db = require("../services/database");
const moment = require('moment');
const RequestData = require("./requestData");

class ResponseData extends Model {}

ResponseData.init(
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
    answer:{
        type: DataTypes.STRING(5000),
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
    modelName: 'responseData',
    tableName: 'responseData', 
        freezeTableName: true,
  }
);

ResponseData.belongsTo(RequestData, {
  foreignKey: 'request_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

module.exports = ResponseData;

const { DataTypes, Model } = require("sequelize");
const db = require("../services/database");
const moment = require('moment');

class RequestData extends Model {}

RequestData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question:{
        type: DataTypes.STRING(1000)
    },
    submittedDate:{
        type:DataTypes.DATE
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
    modelName: 'requestData',
    freezeTableName: true,
    tableName:'requestData'
  }
);

module.exports = RequestData;
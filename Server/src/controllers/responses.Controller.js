const asyncHandler = require("../middleware/asyncHandler");
const Requests = require("../models/requestData");
const Responses = require("../models/responseData");

exports.createResponse = asyncHandler(async (req, res, next) => {
  const answer = req.body;
  const id = req.params.id
  if(!answer){
    return res.status(400).json({
      success:false,
      message:"Талбар дутуу байна"
    })
  }
  const newResponse = await Responses.create({
    request_id:id,
    answer: answer,
    submittedDate: Date.now()
  });
  if(newResponse){
    res.status(200).json({
      success: true,
      message: "Хүсэлтийг амжилттай хадгаллаа",
      data: newResponse
    });
  }
  else{res.status(500).json({
    success:false,
    message:"Хадгалахад алдаа гарлаа"
  })
}
});

exports.getResponse = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const response = await Responses.findOne({
    where: {
      id: id
    }
  });

  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Хүсэлт олдсонгүй"
    });
  }
  return res.status(200).json({
    success: true,
    data: response
  });
});
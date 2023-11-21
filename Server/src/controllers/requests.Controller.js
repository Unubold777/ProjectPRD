const asyncHandler = require("../middleware/asyncHandler");
const Requests = require("../models/requestData");
const Responses = require("../models/responseData");
const Questions = require("../models/questionData");
// implement createQuestion into it for fuck sake fix it before 10pm or bald
exports.createRequest = asyncHandler(async (req, res, next) => {
  const {question, ans1,ans2,ans3} = req.body;
  if(!question || !ans1 || !ans2 || !ans3){
    return res.status(400).json({
      success:false,
      message:"Талбар дутуу байна"
    })
  }
  const newRequest = await Requests.create({
    question: question,
    submittedDate: Date.now()
  });
  if(newRequest){
    const id = newRequest.id;
    const newQuestionAnswer = await Questions.create({
      request_id: id,
      answer1: ans1,
      answer2:ans2,
      answer3:ans3
    });
    if(newQuestionAnswer){
      console.log("saved question and the request!!!")
    }
    res.status(200).json({
      success: true,
      message: "Хүсэлтийг амжилттай хадгаллаа",
    });
  }
  else{res.status(500).json({
    success:false,
    message:"Хадгалахад алдаа гарлаа"
  })
}
});

exports.getRequests = asyncHandler(async (req, res, next) => {
  const allReqs = await Requests
    .findAll({
      order: [["id", "DESC"]],
    })
    .catch((err) => {
      res.status(500).json({
        message: "Серверийн алдаа",
        err
      });
    });
  res.status(200).json({
    success: true,
    data: allReqs,
    message: "Хүсэлтүүдийн жагсаалт",
  });
});

// combined the all the getFunction under getRequest
exports.getRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const request = await Requests.findOne({
    where: {
      id: id
    }
  });
  if (!request) {
    return res.status(404).json({
      success: false,
      message: "Хүсэлт олдсонгүй"
    });
  }
  const response = await Responses.findOne({
    where:{
      request_id: id
    }
  });
  if (!response) {
    return res.status(404).json({
      success: false,
      message: "Хариулт олдсонгүй"
    });
  }
  const question = await Questions.findOne({
    where:{
      request_id: id
    }
  });
  if (!question) {
    return res.status(404).json({
      success: false,
      message: "Хэрэглэгчийн бөглөсөн хариулт олдсонгүй"
    });
  }
  const req_doc = {request: request, question: question, response: response};
  return res.status(200).json({
    success: true,
    data: req_doc
  });
});

exports.deleteRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const request = await Requests.findOne({
    where: {
      id: id,
    },
  });

  if (request) {
    await Requests.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json("User removed successfully!");   
  } else {
    res.status(404).json("User doesn't exist");
  }
});

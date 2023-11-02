const asyncHandler = require("../middleware/asyncHandler");
const Requests = require("../models/requestData");

exports.createRequest = asyncHandler(async (req, res, next) => {
  const {question} = req.body;
  if(!question){
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
    res.status(200).json({
      success: true,
      message: "Хүсэлтийг амжилттай хадгаллаа",
      data: newRequest
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
  return res.status(200).json({
    success: true,
    data: request
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

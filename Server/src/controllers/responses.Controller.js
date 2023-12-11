const asyncHandler = require("../middleware/asyncHandler");
const Responses = require("../models/responseData");
const OpenAI = require('openai');

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

exports.postDocument = asyncHandler(async (req,res,next)=>{
  // expecting to write posting function here but having confusion
// const openai = new OpenAI(process.env.OPENAI_API_KEY);

//   const { messages, previewToken } = req.body;

//   if (previewToken) {
//     openai.configuration.apiKey = previewToken;
//   }

//   const systemMessage = {
//     role: 'system',
//     content: `Please acknowledge my following request. Please respond to me as a product owner. I will ask for subject, and you will help me writing a PRD 
//     for it with these headers and dont include any explanation:  Goal has three subheaders, those are problem, solution, system users, industry, 
//     second header is Feature, this one will give user stories at least 7 to 10 and want todo MoSCoW analysis on those stories, 
//     third header is system's characteristic, in this section write about useability, performance, supportibility, scalability, reliability, 
//     last header is risk, write about what could happen during development process.`,
//   };

//   try {
//     const response = await openai.Completion.create({
//       model: 'gpt-4',
//       prompt: [systemMessage, ...messages].map(msg => msg.content).join('\n'),
//       temperature: 0.5,
//       max_tokens: 200,
//     });
  
//     if (messages === undefined) {
//       return res.status(500).send('Error: Messages are undefined');
//     }
  
//     const payload = {
//       messages: [
//         ...messages,
//         {
//           content: response.choices[0].text,
//           role: 'assistant',
//         },
//       ],
//     };
  
//     return res.status(200).json(payload);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Error: An error occurred while processing your request');
//   }
  
  return `1. Goal:

  Problem:
  Employees not working during designated hours after registering their working time, leading to decreased productivity.

  Solution:
  Develop a system to ensure employee engagement and productivity during working hours post registration.

  System Users:
      Employees: Submit working hours.
      Human Resource: Monitor the system for compliance and productivity.

  Industry:
  Every office setting requiring time tracking and productivity monitoring.

2. Feature:

  User Stories (7-10):
      User-friendly interface for easy working hour submission.
      Real-time visibility for managers.
      Automated notifications for late submissions.
      Request changes to submitted working hours.
      Customizable reporting for managers.
      Mobile-friendly app for convenient tracking.
      Integration with existing HR software.

  MoSCoW Analysis:
      Must Have: User-friendly interface, Real-time visibility, Automated notifications.
      Should Have: Request for changes, Customizable reporting.
      Could Have: Mobile-friendly app, Integration with existing HR software.

3. System's Characteristic:

  Usability:
  Intuitive interface for employees and HR personnel.

  Performance:
  Real-time tracking and reporting with minimal latency.

  Supportibility:
  Regular updates and support for bug fixes.

  Scalability:
  Scalable to accommodate user and data growth.

  Reliability:
  Reliable tracking and reporting of working hours.

4. Risk:

  Potential risks during development:
      Employee resistance to system adoption.
      Integration challenges with existing HR software.
      Technical issues leading to downtime or data inaccuracies.
      Insufficient user training impacting adoption rates.`;
});
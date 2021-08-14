// const functions = require("firebase-functions");
// const express = require("express");
// // express 자바스크립트를 가져와서 초기화 시킴
// // require 는 노드에서 작동하는 문법, require 메소드를 통해서
// // 내부 모듈(여기서는 express 라는 웹 프레임워크)을 가져올 수 있음
// const cors = require("cors");

// eslint-disable-next-line max-len
// const stripe = require("stripe")("sk_test_51JNbCOAXB7OEcg4oOHOZzGCYxrhwA9dnZBm6H4FBdvpNbjiWIe3eKQSs6ifUTargMGD4ygzPzjsLPCFVVAVoidN100RsFtKG5h");
// const app = express();
// // 앱에서 express를 사용하겠다.
// app.use(cors({ origin: true }));
// // app.use를 사용하면 모든 요청들이 use 를 거쳐 가게됨
// // 미들웨어를 설정해줌
// app.use(express.json());
// // 들어오는 모든 요청 객체를 json 객체로 유입하기 위해서 express 에 내장된 객체를 불러온 것
// // 정보들을 json 파일로 주고 받겠다는 것임

// // 라우트 부분
// app.get("/", (req, res) => res.status(200).send("안녕"));
// // 페이지를 라우팅하는 것임, 기본페이지("/")url 과 뷰를 연결 시켜주기 위해 get 함수를 사용함
// // get 함수를 통해서 뷰에 어떤 상태를 넣어줄지를 ()안에 정해줌
// // req 와 res 가 주체가 누군지 아는게 중요함

// app.post("/payments/create", async (request, response) => {
//   const total = request.query.total;
//   console.log(" payment.js에서 가져온 total의 양은 다음과 같다!!  ", total)
//   const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: "usd",
//   });
//   response.status(201).send({
//       clientSecret: paymentIntent.client_secret,
//   })

// })
// exports.api = functions.https.onRequest(app);
// // functions.https 를 이용해서 http 이벤트를 처리하는 함수를 만듬
// // https 방식으로 app 을 구현해 준다라고 생각하자...

// // http://localhost:5001/gh-ddc43/us-central1/api

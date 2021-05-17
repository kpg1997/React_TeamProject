const express = require("express");
const router = express.Router();

const kBook = require("../../public/models/kBook");
const kBookReply = require("../../public/models/kBookReply");
const session = require("../session");

router.use(session);


// 한식 북

//북 메뉴 삽입 페이지
router.post("/write", (req, res, next) => {
    const { kBookTitle, kBookImg } = req.body;
    console.log(req.body);
  
    const kBookModel = new kBook();
  
    kBookModel.kBookTitle = kBookTitle;
    kBookModel.kBookImg = kBookImg;
  
    kBookModel
      .save()
      .then((newKBook) => {
        console.log("한식 북 생성");
        res.status(200).json({
          data: {
            kBook: newKBook,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  });
  
  //북 메뉴 결정 페이지
  router.get('/', (req,res,next)=>{
    
    const kBookNo=req.body.kBookmNo
    console.log("kBookNo",kBookNo)
  
    kBook
      
      .aggregate([{$sample : {size : 1}}])
      .then((kBook)=>{
        if(kBook == "")
          return res.status(404).json({message:"Not Found kBook"});
          console.log("중식 북 결과창 보기");
            res.status(200).json({
              data: {
                kBook: kBook,
              },
          });
      })
      .catch((err)=>{
        res.status(500).json({
          err: err,
        });
      });
  });
  //중식 북 댓글 get

  router.get('/:kBookmNo', (req,res,next)=>{
    const kBookmNo = req.params.kBookmNo;
    console.log('댓글 들어옴')
    console.log("kBookmNo",kBookmNo);
  
    kBookReply
      .find({kBookmNo:kBookmNo})
      .sort({kBookReNo:'-1'})
      .limit(5)
      .then((kBookReply)=>{
        if(kBookReply == "")
          return res.status(404).json({message:"Not Found kBookReply"});
          console.log("중식 북 댓글창 보기");
          console.log('댓글창 보기 kbookmno==>',kBookmNo);
            res.status(200).json({
              data: {
                kBookReply : kBookReply,
              },
          });
      })
      .catch((err)=>{
        res.status(500).json({
          err: err,
        });
      });
  });
  
  //중식 북 댓글 write
  router.post("/kBookReply/write", (req, res, next) => {
  
    
    const { kBookReComment,kBookmNo } = req.body;
    const kBookReUserid = req.session.user_id;
    console.log('kBookNo',kBookmNo);
  
    const kBookReplyModel = new kBookReply();
    
    kBookReplyModel.kBookmNo = kBookmNo;
    kBookReplyModel.kBookReComment = kBookReComment;
    kBookReplyModel.kBookReUserid = kBookReUserid;
    console.log('kBookNo',kBookmNo);
    console.log("kBookReplyModel",kBookReplyModel)
    kBookReplyModel
      .save()
      .then((newkBookReply) => {
        console.log("중식 댓글 write");
        res.status(200).json({
          data: {
            kBookReply: newkBookReply,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  });

  module.exports = router;
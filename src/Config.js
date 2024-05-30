// import AWS from 'aws-sdk'

//   //2. 장착한 그 파일을 S3로 전송
//   export const uploadFileAWS = (file) => {
//     //2-1. aws에서 시킨 양식 그대로 따름
//     const param = {
//       ACL: 'public-read', //일단 public으로 누구나 다 읽을 수 있다...임시로 이렇게 함(나중에 바꿔야)
//       //ContentType: "image/png",  //일단 주석처리함
//       Body: file,
//       Bucket: 'knowbasebucket',
//       Key: 'upload/' + file.name, //`upload/${imageSrcReal.name}`,
//     };
//     //2-2. AWS가 정한 양식대로 보내기
//     AWS.myBucket.putObject(param).send((error) => {
//       if (error) {
//         console.log(error);
//       } else {
//         //const url = myBucket.getSignedUrl("getObject", {Key: param.Key}); 기존의 코드..그런데 이렇게 하면 짤림
//         const signedUrl = myBucket.getSignedUrl('getObject', {
//           Key: param.Key,
//         });
//         const pureUrl = signedUrl.match(/^(https:\/\/[^?]+)/)[1];
//         console.log('awsurl: ', pureUrl);
//         setImgUrl(pureUrl);
//       }
//     });
//   };
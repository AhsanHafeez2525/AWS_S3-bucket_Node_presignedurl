require("dotenv").config();

const { GetObjectCommand, S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "newahsanbucket",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 20 });
  return url;
}

async function putObject (filename, contentType){
const command = new PutObjectCommand({
    Bucket: "newahsanbucket",
    Key: `uploads/user-uploads/${filename}`,
    ContentType: contentType,
  
})
const url = await getSignedUrl(s3Client, command)
return url
}
async function listObjects(){
    const command = new ListObjectsV2Command({
        Bucket: "newahsanbucket",
        key: '/'
    })
    const result = await s3Client.send(command);
  console.log(result)
}
async function initList() {
//   await listObjects()

//   delete a object 
const cmd = new DeleteObjectCommand({
  key: "video-1722893371187.mp4",
  Bucket: "newahsanbucket",
});
await s3Client.send(cmd);
}

initList();
async function init() {
  //   console.log(
  //     "URL for Screenshot 2024-07-09 160432.png",
  //     await getObjectURL("Screenshot 2024-07-09 160432.png")
  //   );

  // to retreive the upload image
//   console.log(
//     "URL for Screenshot 2024-07-09 160432.png",
//     await getObjectURL(process.env.AWS_UPLOAD_URL)
//   );
  // console.log('URL for uploading', await putObject(`image-${Date.now()}.jpeg`, 'image/jpeg'))

//   to upload video
//   console.log('URL for uploading', await putObject(`video-${Date.now()}.mp4`, 'video/mp4'))
}

init();

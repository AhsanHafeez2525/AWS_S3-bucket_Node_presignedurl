require("dotenv").config();

const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
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

async function init() {
  console.log(
    "URL for Screenshot 2024-07-09 160432.png",
    await getObjectURL("Screenshot 2024-07-09 160432.png")
  );
}

init();

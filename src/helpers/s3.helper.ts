import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const uploadToS3 = async (reportId: number, files: any) => {
  // const s3 = new S3Client();
  const s3 = new S3Client({
    region: process.env.AWS_REGION, // Explicitly setting the region
  });

  const params = files.map((file: any) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${reportId}/${file.originalname}`,
      Body: file.buffer,
    };
  });

  await Promise.all(params.map(param => s3.send(new PutObjectCommand(param))));

  const imageUrls = params.map(param => {
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${param.Key}`;
  });

  return imageUrls;
};

export const photoUpload = async (userId: string, file: any) => {
  // const s3 = new S3Client();
  const s3 = new S3Client({
    region: process.env.AWS_REGION, // Explicitly setting the region
  });

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${userId}/${file.originalname}`,
    Body: file.buffer,
  };

  await s3.send(new PutObjectCommand(param));

  const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${param.Key}`;

  return imageUrl;
};

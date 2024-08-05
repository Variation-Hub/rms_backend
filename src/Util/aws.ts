import mime from "mime-types";
import B2 from 'backblaze-b2';

interface FileData {
  originalname: string;
  buffer: Buffer;
}

interface S3Object {
  key: string;
}

// blackblaze services

export const uploadToBackblazeB2 = async (fileData: FileData, folderName: string) => {
  try {
    const b2 = new B2({
      applicationKeyId: process.env.B2_APPLICATION_KEY_ID as string,
      applicationKey: process.env.B2_APPLICATION_KEY as string
    });

    await b2.authorize();

    const bucketId = process.env.B2_BUCKET_ID as string;

    const contentType = mime.lookup(fileData.originalname) || "application/octet-stream";
    const fileName = `${folderName}/${Date.now()}_${fileData.originalname}`;

    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: bucketId
    });

    const uploadResponse = await b2.uploadFile({
      uploadUrl: uploadUrlResponse.data.uploadUrl,
      uploadAuthToken: uploadUrlResponse.data.authorizationToken,
      fileName: fileName,
      data: fileData.buffer,
      mime: contentType
    });

    const fileUrl = `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}`;

    return {
      key: fileName,
      url: fileUrl,
    };
  } catch (error) {
    console.error("Error uploading file to Backblaze B2:", error);
    throw error;
  }
};

export const uploadMultipleFilesBackblazeB2 = async (files: FileData[], folderName: string) => {
  try {

    const uploadResults = [];

    for (const file of files) {
      const result = await uploadToBackblazeB2(file, folderName);
      uploadResults.push(result);
    }

    return uploadResults;
  } catch (error) {
    throw error;
  }
};

export const deleteFromBackblazeB2 = async (obj: S3Object) => {
  try {
    const b2 = new B2({
      applicationKeyId: process.env.B2_APPLICATION_KEY_ID as string,
      applicationKey: process.env.B2_APPLICATION_KEY as string
    });

    await b2.authorize();

    const bucketId = process.env.B2_BUCKET_ID as string;
    const fileName = obj.key;

    // Get file ID required for deletion
    const fileInfoResponse = await b2.listFileNames({
      bucketId,
      prefix: fileName,
      maxFileCount: 1,
      startFileName: fileName,
      delimiter: ''
    });


    if (fileInfoResponse.data.files.length === 0) {
      return false
    }

    const fileId = fileInfoResponse.data.files[0].fileId;

    const deleteFileResponse = await b2.deleteFileVersion({
      fileId,
      fileName
    });

    return deleteFileResponse;
  } catch (error) {
    console.error("Error deleting file from Backblaze B2:", error);
    // throw error;
  }
};

export const deleteMultipleFromBackblazeB2 = async (keys: string[]) => {
  try {
    const b2 = new B2({
      applicationKeyId: process.env.B2_APPLICATION_KEY_ID as string,
      applicationKey: process.env.B2_APPLICATION_KEY as string
    });

    await b2.authorize();

    const bucketId = process.env.B2_BUCKET_ID as string;
    const deleteResponses = [];

    for (const key of keys) {
      const fileName = key;

      const fileInfoResponse = await b2.listFileNames({
        bucketId,
        prefix: fileName,
        maxFileCount: 1,
        startFileName: fileName,
        delimiter: ''
      });

      if (fileInfoResponse.data.files.length === 0) {
        console.error(`File with key ${fileName} not found in Backblaze B2.`);
        continue;
      }

      const fileId = fileInfoResponse.data.files[0].fileId;

      const deleteFileResponse = await b2.deleteFileVersion({
        fileId,
        fileName
      });

      deleteResponses.push(deleteFileResponse);
    }

    return deleteResponses;
  } catch (error) {
    console.error("Error deleting files from Backblaze B2:", error);
    // throw error;
  }
};


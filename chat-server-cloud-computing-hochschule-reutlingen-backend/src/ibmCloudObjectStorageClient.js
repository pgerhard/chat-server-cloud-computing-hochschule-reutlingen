const Logger = require("./logger");
const Environment = require("./environment");
const Encoder = require("./encoder");
let AWS = require("ibm-cos-sdk");

class IbmCloudObjectStorageClient {
  /**
   * Default constructor for the IbmCloudObjectStorageClient. Configured based on the environment.
   */
  constructor() {
    var config = {
      endpoint: Environment.ibmCos.endpoint,
      apiKeyId: Environment.ibmCos.apiKey,
      ibmAuthEndpoint: Environment.ibmCos.ibmAuthEndpoint,
      serviceInstanceId: Environment.ibmCos.serviceInstanceId
    };

    this.logger = new Logger();
    this.cos = new AWS.S3(config);
    this.encoder = new Encoder();
  }

  slimCreateObject(bucket, key, object) {
    this.logger.info(`IbmCloudObjectStorageClient: Creating object in: \nbucket: ${bucket} \nkey: ${key}`);

    this.logger.debug(`IbmCloudObjectStorageClient: Hashed key to use for storage ${key}`);
    return this.cos
      .putObject({
        Bucket: bucket,
        Key: key,
        Body: object
      })
      .promise();
  }

  /**
   * Create the given object in the IBM Cloud Object Storage account.
   * @param bucket to place the object in
   * @param key under which to place the object
   * @param object to place
   * @returns {Promise<S3.PutObjectOutput & {$response: Response<S3.PutObjectOutput, AWSError>}>} of the upload result
   */
  createObject(bucket, key, object) {
    this.logger.info(`IbmCloudObjectStorageClient: Creating object in: \nbucket: ${bucket} \nkey: ${key}`);
    this.logger.debug(`IbmCloudObjectStorageClient: Hashing key before storage`);
    return this.encoder
      .md5Hash(key)
      .then(hashedKey => {
        this.logger.debug(`IbmCloudObjectStorageClient: Hashed key to use for storage ${hashedKey}`);
        return this.cos
          .putObject({
            Bucket: bucket,
            Key: hashedKey,
            Body: object
          })
          .promise();
      })
      .catch(reason => this.logger.info(`IbmCloudObjectStorageClient: Something went horribly wrong ${reason}`));
  }

  /**
   * Load the object corresponding to the key from the specified bucket in IBM Cloud Object Storage account.
   * @param bucket to load the object from
   * @param key of the object to load
   *
   * @returns a Buffer containing the body content or null
   */
  loadObject(bucket, key) {
    this.logger.info(`IbmCloudObjectStorageClient: Loading object from: \nbucket: ${bucket} \nkey: ${key}`);
    this.logger.debug(`IbmCloudObjectStorageClient: Hashing key in order to load object`);
    return this.encoder
      .md5Hash(key)
      .then(hashedKey => {
        this.logger.debug(`IbmCloudObjectStorageClient: Hashed key to use for loading object ${hashedKey}`);
        return this.cos
          .getObject({
            Bucket: bucket,
            Key: hashedKey
          })
          .promise();
      })
      .then(data => {
        const bodyContentBuffer = Buffer.from(data.Body);
        if (data != null) {
          this.logger.debug(`IbmCloudObjectStorageClient: File Content ${bodyContentBuffer.toString()}`);
          return bodyContentBuffer;
        } else {
          this.logger.info(`IbmCloudObjectStorageClient: No object found for: \nbucket: ${bucket} \nkey: ${key}`);
          return null;
        }
      })
      .catch(e => {
        this.logger.error(`IbmCloudObjectStorageClient: ${e.code} - ${e.message}\n`);
      });
  }

  /**
   * Delete the given object from IBM Cloud Object Storage account.
   * @param bucket to delete the object from
   * @param key of the object to delete
   * @returns a promise that resolves when the deletion is finished
   */
  deleteObject(bucket, key) {
    this.logger.info(`IbmCloudObjectStorageClient: Deleting object from: \nbucket: ${bucket} \nkey: ${key}`);
    this.logger.debug(`IbmCloudObjectStorageClient: Hashing key in order to delete object`);
    this.encoder.md5Hash(key).then(hashedKey => {
      this.logger.debug(`IbmCloudObjectStorageClient: Hashed key to use for deleting object ${hashedKey}`);
      return this.cos
        .deleteObject({
          Bucket: bucket,
          Key: hashedKey
        })
        .promise();
    });
  }
}

module.exports = IbmCloudObjectStorageClient;

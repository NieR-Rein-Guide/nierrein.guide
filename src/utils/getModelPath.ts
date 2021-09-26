export default function getModelPath(type = "character", folderName = "sk_ch031001") {
  return `https://s3.eu-central-1.wasabisys.com/models/${type}/${folderName}/${folderName}.fbx`;
}
import axios from "axios";

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("image", file);

          axios
            .post("/api/blog/upload-image", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.uploaded) {
                resolve({
                  default: response.data.url, // 업로드된 이미지 URL
                });
              } else {
                reject(response.data.error.message || "업로드 실패");
              }
            })
            .catch((error) => {
              console.error("이미지 업로드 실패:", error);
              reject("이미지 업로드에 실패했습니다.");
            });
        })
    );
  }
}

export default UploadAdapter;

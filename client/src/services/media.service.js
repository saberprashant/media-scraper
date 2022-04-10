import http from "./http-common";

class MediaService {
  findAssets(data) {
    return http.post("/findAssets", data);
  }

  fetchAssets() {
    return http.get(`/fetchAssets`);
  }
}

export default new MediaService();
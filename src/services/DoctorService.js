class DoctorService {

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async getDoctors(url) {
        try {
            return await this.httpClient.get(url)
        } catch(error) {
            // console.error(error);
            throw error;
        }
    }

    async createOrUpdateDoctor(url, body) {
        try {
            return await this.httpClient.post(url, body)
        } catch(error) {
            // console.error(error);
            throw error;
        }
    }

}

export default DoctorService;
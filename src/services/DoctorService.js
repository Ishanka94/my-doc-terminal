class DoctorService {

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    async getDoctors(url) {
        try {
            console.log('doc service called')
            // logic here
            return await this.httpClient.get(url)
        } catch(error) {
            console.error(error);
            throw error;
        }
    }

}

export default DoctorService;
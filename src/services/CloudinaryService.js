const cloudName='aiuasol7'
const uploadPreset='wkqu99u4'
const uploadURL=` https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
import axios from 'axios'

class CloudinaryService{

    async upload(image){
        let formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', uploadPreset)

        const result = await axios.post(uploadURL, formData);

        return result.data.secure_url;
    }
}
export default new CloudinaryService
import multer from "multer";
import {v4 as uuid} from "uuid"

const storage=multer.diskStorage({
    destination(req, file, callback) {
        callback(null,"uploads");
    },
    filename(req, file, callback) {
        const id=uuid()
        const extName=file.originalname.split(".").pop()
        const firstName=file.originalname.split(".").reverse().pop()
        const filename=`${firstName}${id}.${extName}`
        callback(null,filename);
        // callback(null,file.originalname);
    },
})

export const singleUpload=multer({storage}).single("photo")
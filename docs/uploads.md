# Signed upload contract

The client sends POST /uploads/presign/ with filename, content_type, and directory. REACT_APP_UPLOAD_SIGNING_PATH can override the path. The API must return upload_url, location, and optional headers. The client uploads the original file with PUT and returns location to the existing forms.

The backend must authenticate and authorize the caller, choose the object key itself, validate directory and content type, and issue a short-lived signed URL scoped to that object. It must enforce the upload size limit independently. Set bucket CORS to allow PUT from the application origins and the signed headers.

Some existing signup screens upload before login. The backend must support a scoped registration session for those requests or the signup flow must defer uploads until authentication. Do not make anonymous signing unrestricted.

This repository contains the client only. The endpoint must be implemented and tested on the backend before uploads will work. Old AWS keys must be revoked outside this repository.

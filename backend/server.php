<?php
header('Access-Control-Allow-Origin: http://localhost:3000');

if (isset($_POST['submit_btn']) && $_POST['submit_btn'] == 'Upload') {
    if (isset($_FILES['uploaded_file']) && $_FILES['uploaded_file']['error'] === UPLOAD_ERR_OK) {
        // get details of the uploaded file

        $fileTmpPath = $_FILES['uploaded_file']['tmp_name'];
        $fileName = $_FILES['uploaded_file']['name'];
        $fileSize = $_FILES['uploaded_file']['size'];
        $fileType = $_FILES['uploaded_file']['type'];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        $allowedfileExtensions = array('php1', 'js');

        if (!in_array($fileExtension, $allowedfileExtensions)) {
            $uploadFileDir = 'uploads/';
            $dest_path = $uploadFileDir . $fileName;

            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $message = 'File is successfully uploaded on directory uploads';
            } else {

                $message = 'There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.';
            }
        } else {
            $message = 'this file extension is not allowed.';
        }
    } else {
        $message = 'There is some error in the file upload. Please check the following error.<br>';
        $message .= 'Error:' . $_FILES['uploaded_file']['error'];
    }
}

echo $message;

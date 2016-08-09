Dropzone.options.myAwesomeDropzone = {
    acceptedFiles: 'image/*',
    accept: function(file, done) {
        document.getElementById("dropzonePreview").innerHTML="";
        //$('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);
        //console.log(file);
        done();
    },
    added: function(file) {
        //$('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);
    },
    uploadMultiple:false,
    previewsContainer: '#dropzonePreview',
    success: function(file, responseText, e) {
        var obj = jQuery.parseJSON(responseText);
        if (obj.status>0) {
            //var newimg = document.createElement('img');
            //newimg.src = '.'+obj.preview;
            //addMediaOld(document.getElementById("dz"),newimg);
            addFoto(obj);
        }
    },
    totaluploadprogress: function(totalUploadProgress, totalBytes, totalBytesSent) {
        //console.log(totalUploadProgress);
        //console.log(totalBytes);
        //console.log(totalBytesSent);
        var per=totalBytesSent/totalBytes*100;
        if (per!=100){
            //$('.progress').css('display','block');
            $('.progress').removeClass('hide');
        } else{
            //$('.progress').css('display','none');
            $('.progress').addClass('hide');
        }
        $('.progress-bar').css('width', per.toFixed(0)+'%').attr('aria-valuenow', per.toFixed(0));
    },
};
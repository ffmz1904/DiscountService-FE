export const prepareImgUpload = (event, preloadImgSetter, fileSetter) => {
    const { files } = event.target;

    if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => preloadImgSetter(event.target.result);
        reader.readAsDataURL(files[0]);
        fileSetter(files[0]);

        return true;
    }

    return false;
};

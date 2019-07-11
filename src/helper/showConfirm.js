export const showConfirm = ({ message, success, cancel = () => {} }) => {
    let conf = window.confirm(message);
    if (conf === true) {
        success();
    } else {
        if (cancel !== null || cancel !== undefined) {
            cancel();
        }
    }
}
export const convertFileSize = (size) => {
    const power = size == 0 ? 0 : Math.floor(Math.log(size)/Math.log(1024));
    return (size / Math.pow(1024, power)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][power];
};

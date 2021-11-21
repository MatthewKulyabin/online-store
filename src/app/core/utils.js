export const changeJoiErrorMessage = (message, [path]) => {
  const pathErrorIndex = path.length + 3;
  let pathErrorMessage = path[0].toUpperCase() + path.slice(1);
  path.indexOf('Id') !== -1 &&
    (pathErrorMessage = pathErrorMessage.slice(0, path.indexOf('Id')));

  const messageError = message.slice(pathErrorIndex);
  return pathErrorMessage + ' ' + messageError;
};

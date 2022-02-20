export const changeJoiErrorMessage = (message, [path]) => {
  const pathErrorIndex = path.length + 3;
  let pathErrorMessage = path[0].toUpperCase() + path.slice(1);
  path.indexOf('Id') !== -1 &&
    (pathErrorMessage = pathErrorMessage.slice(0, path.indexOf('Id')));
  if (path.indexOf('_')) {
    pathErrorMessage = pathErrorMessage.split('');
    pathErrorMessage[path.indexOf('_')] = ' ';
    pathErrorMessage = pathErrorMessage.join('');
  }

  const messageError = message.slice(pathErrorIndex);

  return `'${pathErrorMessage}' ${messageError}`;
};

export const isFuncEmpty = (func) => {
  return func.toString().indexOf('{') - func.toString().indexOf('}') === -1;
};

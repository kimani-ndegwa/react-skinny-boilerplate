export const assignClassName = (baseClass, index) => {
  let className = "";
  switch (index + 1) {
    case 1:
      index = "first";
      break;
    case 2:
      index = "second";
      break;
    case 3:
      index = "third";
      break;
    case 4:
      index = "fourth";
      break;
    default:
      index = "";
  }

  className = `${baseClass} ${index}`;
  return className;
};

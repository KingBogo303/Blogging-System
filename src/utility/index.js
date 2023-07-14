export const excerpt = (str, count) => {
  if (str.length > count) {
    str = str.substring(0, count) + " ... ";
  }
  return str;
};

export const firstName = (name) =>{
  const arr=name.split(" ")
  return arr[0]

}
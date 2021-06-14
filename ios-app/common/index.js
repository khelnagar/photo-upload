export const createFormData = (arr) => {
  const data = new FormData();

  for (el of arr) {
  	data.append(el.name, el.value);
  }

  return data;
};
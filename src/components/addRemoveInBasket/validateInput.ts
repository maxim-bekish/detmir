export const validateInput = (value: number): boolean => {
  let error: boolean = false;
  if (isNaN(value)) {
    error = true;
    alert("Количество должно быть числом");
  } else if (value < 0) {
    error = true;
    alert("Количество не может быть отрицательным");
  } else if (value > 10) {
    error = true;
    alert(`Количество не может превышать 10`);
  }
  return error;
};

export const inputValidate = (input, err) => {
    console.log(input);
    if (input.value.trim() === "") {
      err.classList.add("_visible");
      return false;
    } else {
      err.classList.remove("_visible");
      return true;
    }
  };
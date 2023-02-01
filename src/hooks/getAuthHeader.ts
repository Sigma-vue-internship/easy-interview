export function getAuthHeader() {
  const token = localStorage.getItem("auth_token");
  if (token) {
    console.log("WHY AM I NOT HERE ???");
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}

export function getAuthHeader() {
  const token: string | null = localStorage.getItem("auth_token");
  const parsedToken = JSON.parse(token);
  console.log(token);
  if (parsedToken) {
    return { Authorization: "Bearer " + parsedToken };
  } else {
    return {};
  }
}

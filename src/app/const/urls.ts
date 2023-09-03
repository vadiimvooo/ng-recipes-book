const apiKey = 'AIzaSyCOgDlm0H1UIsn3Vxl9cUQd1lZDF9B9No4'
export const baseAuthUrl = `https://identitytoolkit.googleapis.com/v1/accounts`;
const baseUrl = "https://course-app-backend-default-rtdb.europe-west1.firebasedatabase.app"

export const urls = {
  recipes: `${baseUrl}/recipes.json`,
  signUp: `${baseAuthUrl}:signUp?key=${apiKey}`,
  login: `${baseAuthUrl}:signInWithPassword?key=${apiKey}`
}

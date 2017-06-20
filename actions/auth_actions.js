import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "./type";
import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
// export const facebookLogin = () => {
//     return async (dispatch) => {
//         let token = await AsyncStorage.getItem('token');
//         if (token){
//             // already login
//         }else {
//             // not login at all
//         }
//     }
// }

// refactor

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem("fb_token");
  //         đợi cái này chạy xong mới tính tiếp
  if (token) {
    // already login
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS });
  } else {
    // not login at all
    fbLogin();
  }
};

const fbLogin = async dispatch => {
//   let { type, token } = await Facebook.logInWithReadPermissionsAsync("323404488095506",
//   { permissions: ["public_profile"]} );
  let result = await Facebook.logInWithReadPermissionsAsync("323404488095506",
  { permissions: ['public_profile']} );
  
  console.log(result)

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  await AsyncStorage.setItem("fb_token", token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

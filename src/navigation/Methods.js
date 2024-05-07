import AsyncStorage from '@react-native-async-storage/async-storage';

export const onNavigate = (navigation, route, params) => {
  navigation?.navigate(route, params);
};

export const validateEmail = text => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (text === '') {
    return '*';
  } else if (!emailRegex.test(text)) {
    return 'Please enter a valid email address';
  } else {
    return '';
  }
};

export const saveDatainStorage = async (Key, data) => {
  try {
    await AsyncStorage.setItem(Key, JSON.stringify(data));
  } catch (error) {
    return error;
  }
};

export const getDatafromStorage = async key => {
  const savedUser = await AsyncStorage.getItem(key);
  const currentUser = JSON.parse(savedUser);
  return currentUser;
};

export const delDatafromStorage = async key => {
  await AsyncStorage.removeItem(key);
};

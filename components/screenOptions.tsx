import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const getTabBarButton = (props:any) => {
  const icons: Record<string, keyof typeof AntDesign.glyphMap> = {
    Home: "home",
    Search: "search1",
    Saved: "hearto",
    Profile: "user",
  };

  const iconName = icons[props.accessibilityLargeContentTitle];
  const selectedColor = props.accessibilityState.selected ? "#AB8BFF" : '#A8B5DB';

  return <TouchableOpacity activeOpacity={1} {...props} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <AntDesign name={iconName} size={24} color={selectedColor} />
    <Text className='mt-2' style={{color: selectedColor}}>{props.accessibilityLargeContentTitle}</Text>
  </TouchableOpacity>
}

export const screenOptions = () : BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: '#1E90FF',
  tabBarInactiveTintColor: '#A9A9A9',
  tabBarItemStyle: {
  } as ViewStyle,
  tabBarStyle: {
    borderTopWidth:0,
    backgroundColor: '#0F0D23',
    height: 76,
    elevation: 0,
    shadowColor: "transparent",
  } as ViewStyle,
  tabBarLabelStyle: {
    fontSize: 12,
  },
  tabBarButton: (props) => getTabBarButton(props)
});

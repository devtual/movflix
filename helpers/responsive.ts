import { Dimensions, PixelRatio } from "react-native";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get('window').height;
const baseWidth = 375;
const baseHeight = 812;

export const wp = (widthPercent: number | string) => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
    const scale = screenWidth / baseWidth;
    
    return PixelRatio.roundToNearestPixel(scale * elemWidth);
    
};

export const hp = (heightPercent: number | string) => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
    const scale = screenHeight / baseHeight;
  
    return PixelRatio.roundToNearestPixel(scale * elemHeight);
};

export const fontScale = {scale: 1};


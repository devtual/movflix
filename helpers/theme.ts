import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { fontScale, wp } from "./responsive";

export const fontSizes = (val: number) => {
    return wp(val * fontScale.scale);
}

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export class StyleSheetManager
{
  private static sheets: any = [];
  private static lastScale: number = 1;

  public static Create<T extends NamedStyles<T> | NamedStyles<any>>(st: T & NamedStyles<any>): T
  {
    const orgStyles = JSON.parse(JSON.stringify(st));
    this.sheets.push(orgStyles); 
    return StyleSheet.create(st); 
  }

  public static rebuild()
  {
    if (this.lastScale == fontScale.scale)
        return;

    this.lastScale = fontScale.scale;

    this.sheets.forEach((orgStyles: any , index:string) => {
      for(var key in orgStyles)
      {
        if (orgStyles[key]['fontSize'])
            orgStyles[key]['fontSize'] *= fontScale.scale;
      }

      this.sheets[index] = StyleSheet.create(orgStyles);
    })
  }
}
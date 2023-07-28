import {Color, IconType} from "../constants/enums";

export const createTag = (file : string) : string => {
   return `[${file}] :: `;
}

export const getImageFromIconType = (type : IconType) : any =>{

}

export const getColorVarNameFromType = (type : Color) : string => {
   switch (type) {
      case Color.LightBlue: return "--light-blue";
      case Color.Blue: return "--blue";
      case Color.DarkBlue: return "--dark-blue";
      case Color.Red: return "--red";
      case Color.Grey: return "--grey";
      case Color.DarkGrey: return "--dark-grey";
      case Color.LightGrey: return "--light-grey";
      case Color.White: return "--white";
      default: return "";
   }
}

export const varFormatWithColor = (type : Color) : string => {
   const color = getColorVarNameFromType(type);
   return `var(${color})`;
}

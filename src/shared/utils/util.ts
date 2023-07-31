import {Color, Font} from "../constants/enums";

export const createTag = (file : string) : string => {
   return `[${file}] :: `;
}

export const _getColorVarNameFromType = (type : Color) : string => {
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
   const color = _getColorVarNameFromType(type);
   return `var(${color})`;
}

function _getFontVarNameFromType(font: Font) : string{
   switch (font){
      case Font.Light: return "--primary-font-light";
      case Font.Primary:
      default: return "--primary-font";
   }
}

export const varFormatWithFont = (font : Font) : string => {
   const f = _getFontVarNameFromType(font);
   return `var(${f})`;
}

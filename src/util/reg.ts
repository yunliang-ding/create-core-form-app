export const maxEnglishOrNumber = /^[A-Z0-9-]+$/;
export const mobilePhoneReg = /^1[345789]\d{9}$/;
export const telephoneReg = /^[0-9]{3,5}-[0-9]{7,8}$/;
export const landlineReg = /^0\d{2,3}-[1-9]\d{6,7}$/;
export const telephoneWithNationCodeReg = /^0086-[0-9]{3,5}-[0-9]{7,8}$/;
export const phoneReg = /^0086-[0-9]{3,5}-[0-9]{7,8}$|^1[3456789]\d{9}$/;
export const validateMsgReg = /^\d{4,6}$/;
export const acceptAudioFile = /.mp3$|.wav$|.m4a$/;
export const emailStringReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*$/;
export const qqStringReg = /^[1-9]\d{4,14}$/;
export const wechatStringReg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
export const acceptFile =
  /.txt$|.doc$|.docx$|.xls$|.xlsx$|.jpg$|.jpeg$|.png$|.bmp$|.pdf$|.rar$|.zip$|.avi$|.mp4$|.wav/;
export const idNumReg =
  /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
export const unifiedCode =
  /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
export const urlReg =
  /^(((http|ftp|https):\/\/)?)([a-zA-Z0-9.-])(:[0-9]{1,4})\/[a-zA-Z0-9&%.\/-~-]*/;

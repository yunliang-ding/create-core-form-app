/* eslint-disable no-console */
import { createFromIconfontCN } from '@ant-design/icons';
/**
 * iconUrl
 */
export const iconUrl = '//at.alicdn.com/t/font_3520214_lrb7p74of8d.js';
/**
 * icon
 */
export const Icon = createFromIconfontCN({
  scriptUrl: iconUrl,
});
/**
 * getLocalStore
 */
export const getLocalStore = (name: string) => {
  try {
    const content = localStorage.getItem(name);
    if (content !== null) {
      return JSON.parse(content);
    }
  } catch (error) {
    console.log(error);
  }
};

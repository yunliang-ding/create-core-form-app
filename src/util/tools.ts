/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable function-paren-newline */
/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { message } from 'antd';

/** 判断空 */
export const isEmpty = (param: any) => {
  if (param === null || param === undefined) {
    return true;
  }
  if (Array.isArray(param)) {
    return param.length === 0;
  }
  if (typeof param === 'string') {
    return param.trim() === '';
  }
  if (typeof param === 'object') {
    return Object.keys(param).length === 0;
  }
  return false;
};
/**
 * html2canvas
 * @param element
 * @param filename
 */
export function printImg(element, filename: string) {
  html2canvas(element, { useCORS: true }).then((canvas) => {
    document.documentElement.classList.remove('html2canvas');
    const a = document.createElement('a');
    a.download = filename;
    a.href = canvas.toDataURL();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
/**
 * oss文件下载
 */
export const downloadOssFile = (url, fileName = '') => {
  // 跨域文件路径、下载到本地的文件名
  const x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = function () {
    const _url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = _url;
    a.download = fileName;
    a.click();
  };
  x.send();
};
/**
 * 下载后端打包文件
 */
export function fetchFile(url: string, name: string, useHeader = true) {
  const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/octet-stream',
  };
  let config: any = {
    method: 'GET',
    headers: DEFAULT_HEADERS,
    credentials: 'include',
  };
  if (!useHeader) {
    config = {
      method: 'GET',
      mode: 'cors',
    };
  }
  return new Promise((resolve) => {
    fetch(url, config)
      .then((response) => {
        response
          .blob()
          .then((blob) => {
            const blobUrl = window.URL.createObjectURL(blob);
            const aElement = document.createElement('a');
            const filename = `${name}`;
            aElement.href = blobUrl; // 设置a标签路径
            aElement.download = filename;
            aElement.click();
            window.URL.revokeObjectURL(blobUrl);
            resolve(true);
          })
          .catch(() => {
            resolve(true);
          });
      })
      .catch((error) => {
        resolve(true);
        message.error(error.message);
      });
  });
}
/**
 * 导出Excel
 * @param {Array}  sourceData 导出数据
 * @param {Array}  columns 导出表头
 * @param {String} title 导出表名
 */
export const exportExcel = async (
  headers,
  data,
  fileName = '未命名报表.xlsx',
) => {
  if (data && data.length === 0) {
    return;
  }
  const _headers = headers
    .map((item, i) =>
      Object.assign(
        {},
        {
          key: item.key,
          title: item.title,
          position: String.fromCharCode(65 + i) + 1,
        },
      ),
    )
    .reduce(
      (prev, next) =>
        Object.assign({}, prev, {
          [next.position]: { key: next.key, v: next.title },
        }),
      {},
    );
  const _data = data
    .map((item, i) =>
      headers.map((key, j) =>
        Object.assign(
          {},
          {
            content: item[key.key],
            position: String.fromCharCode(65 + j) + (i + 2),
          },
        ),
      ),
    )
    // 对刚才的结果进行降维处理（二维数组变成一维数组）
    .reduce((prev, next) => prev.concat(next))
    // 转换成 worksheet 需要的结构
    .reduce(
      (prev, next) =>
        Object.assign({}, prev, { [next.position]: { v: next.content } }),
      {},
    );
  // 合并 headers 和 data
  const output = Object.assign({}, _headers, _data);
  // 获取所有单元格的位置
  const outputPos = Object.keys(output);
  // 计算出范围 ,["A1",..., "H2"]
  const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
  // 构建 workbook 对象
  const wb = {
    SheetNames: ['Sheet1'],
    Sheets: {
      Sheet1: Object.assign({}, output, {
        '!ref': ref,
        '!cols': headers.map((item) => {
          return {
            wpx: item.width || 100,
          };
        }),
      }),
    },
  };
  // 导出 Excel
  await XLSX.writeFile(wb, fileName);
  return 200;
};
/*
exportExcel([{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  className: 'text-monospace',
}, {
  title: '年级',
  dataIndex: 'grade',
  key: 'grade',
}, {
  title: '部门',
  dataIndex: 'department',
  key: 'department',
}], [{
  name: "张三",
  grade: "2017级",
  department: "前端部门"
}, {
  name: "李四",
  grade: "2017级",
  department: "程序部门"
}], "人员名单.xlsx")
*/

// 千分位，小数点2位
export const NumberFormat = (
  number: any,
  options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
) => {
  if (isNaN(Number.parseFloat(number))) {
    return '';
  }
  return Number(number).toLocaleString('zh-CH', options);
};
/**
 * 解析参数
 * demo: getUrlSearchParams('id=10&tab=1&name=test') // {id: "10", tab: "1", name: "test"}
 * @param search
 * @returns
 */
export const getUrlSearchParams: any = (
  search = decodeURIComponent(location.hash).split('?')[1],
) => {
  const params = {};
  const searchParams: any = new URLSearchParams(search);
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

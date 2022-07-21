/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
const path = require('path');
const fs = require('fs-extra');

module.exports = function (source) {
  const dir = this.query.useDir || 'pages'; // 路由文件夹, 默认pages
  const filePath = this.resourcePath.split(dir)[1];
  const parseCode = strategyParse(source, filePath);
  // 创建文件
  fs.ensureFileSync(path.resolve(__dirname, `../.ice/schema/${filePath}`));
  // 写入到缓存文件
  fs.outputFile(
    path.resolve(__dirname, `../.ice/schema/${filePath}`),
    parseCode,
  );
  // 交给webpack处理
  return parseCode;
};

const parseForm = (code) => {
  return `// @ts-nocheck
import { Form } from "react-core-form";
${code.replace('export default ', 'const schema = ')}
export default (props = {}) => {
  return <Form {...schema(props)} />;
};`;
};

const parseCardForm = (code) => {
  return `// @ts-nocheck
import { CardForm } from "react-core-form";
${code.replace('export default ', 'const schema = ')}
export default (props = {}) => {
  return <CardForm {...schema(props)} />;
};`;
};

const parseTable = (code) => {
  return `// @ts-nocheck
import { Table } from "react-core-form";
${code.replace('export default ', 'const schema = ')}
export default (props = {}) => {
  return <Table {...schema(props)} />;
};`;
};

// 策略逻辑
const strategyParse = (source, filePath) => {
  if (filePath.endsWith('.f.tsx')) {
    return parseForm(source);
  } else if (filePath.endsWith('.cf.tsx')) {
    return parseCardForm(source);
  } else if (filePath.endsWith('.t.tsx')) {
    return parseTable(source);
  }
  return source;
};

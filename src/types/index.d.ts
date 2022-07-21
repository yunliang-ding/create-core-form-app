export interface LayoutProps {
  title: string;
  pathname: string;
  navTheme: 'light' | 'dark' | 'realDark';
  status: 'login' | 'loading' | 'error' | 'noPermissions' | 'userDisabled';
  layout: any;
}

interface RequestRes {
  returnMsg: string;
  returnCode: string;
  returnData: any;
  currentCourtId?: string;
  currentOrganizationId?: string;
  operateDateId?: string;
  operateTypeEnum?: string;
  type?: string;
  isError?: any;
  success?: boolean;
}

/** 请求Func */
declare type RequestFunc = (data: any) => Promise<RequestRes>;

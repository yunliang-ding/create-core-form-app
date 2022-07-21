import {
  createStore,
  IStoreDispatch,
  IStoreModels,
  IStoreRootState,
} from 'ice';
import user from '@/models/user';
import ui from '@/models/ui';
import breadcrumb from '@/models/breadcrumb';

interface IAppStoreModels extends IStoreModels {
  user: typeof user;
  ui: typeof ui;
  breadcrumb: typeof breadcrumb;
}

const appModels: IAppStoreModels = {
  user,
  ui,
  breadcrumb,
};

const store = createStore(appModels, {
  // options
  disableImmer: true,
});
export default store;
export type IRootDispatch = IStoreDispatch<typeof appModels>;
export type IRootState = IStoreRootState<typeof appModels>;

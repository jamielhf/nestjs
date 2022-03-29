import { errorLogger } from '../../common/logger';

export const TryCatch = (target, name, descriptor) => {
  return {
    ...descriptor,
    value(...args) {
      try {
        return descriptor.value.apply(this, args);
      } catch (e) {
        errorLogger.error(e);
      }
    },
  };
};

import { errorLogger } from "../../common/logger"


export const TryCatch = (target, name, descriptor) => {
  return {
    ...descriptor,
    value(...args) {
      try {
        return descriptor.value.apply(this, args)
      } catch (e) {
        console.log(222, e);
        errorLogger.error(e);
      }
    }
  }

}


/**
 * 日志打印装饰器
 */
export const  logger = function() {
    return (target, name, descriptor) => {
        var oldValue = descriptor.value;
        descriptor.value = async function() {
            const result = await oldValue.apply(this, arguments);
            this.logger.log(JSON.stringify(result));
            return result;
           
        };
        return descriptor;
    }
}
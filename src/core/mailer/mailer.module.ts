/*
 * @Author: your name
 * @Date: 2019-12-18 17:16:01
 * @LastEditTime: 2019-12-18 19:17:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nestjs\src\core\mailer\mailer.module.ts
 */
import { DynamicModule, Module, Provider, Global } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Module({
  providers: [MailerService]
})
export class MailerModule {
     /**
     * 同步引导邮箱模块
     * @param options 邮箱模块的选项
     */
    static forRoot<T>(options: T): DynamicModule {
        return {
            module: MailerModule,
            providers: [
                { provide: MAILER_MODULE_OPTIONS, useValue: options },
                createMailerClient<T>(),
                MailerService,
            ],
            exports: [MailerService],
        };
    }

    /**
     * 异步引导邮箱模块
     * @param options 邮箱模块的选项
     */
    static forRootAsync<T>(options: MailerModuleAsyncOptions<T>): DynamicModule {
        return {
            module: MailerModule,
            imports: options.imports || [],
            providers: [
                ...this.createAsyncProviders(options),
                createMailerClient<T>(),
                MailerService,
            ],
            exports: [MailerService],
        };
    }
}

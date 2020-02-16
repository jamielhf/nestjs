
import { DynamicModule, Module, Provider, Global } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Module({})
export class MailerModule {
     /**
     * 同步引导邮箱模块
     * @param options 邮箱模块的选项
     */
    static forRoot<T>(options: T): DynamicModule {
        return {
            module: MailerModule,
            providers: [
                { 
                    provide: MailerService, 
                    useValue: options 
                },
            ],
            exports: [MailerService],
        };
    }

    /**
     * 异步引导邮箱模块
     * @param options 邮箱模块的选项
     */
    static forRootAsync<T>(options): DynamicModule {
        return {
            module: MailerModule,
            imports: options.imports || [],
            providers: [{
                provide: 'MAIL_OPTION',
                useFactory: options.useFactory,
                inject: options.inject,
                },
                MailerService,
            ],
            exports: [MailerService],
        };
    }
}

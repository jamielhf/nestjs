import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    filePath = filePath ? filePath: `config/${process.env.NODE_ENV || 'development'}.env` 
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: Joi.number().default(3000),
      API_AUTH_ENABLED: Joi.boolean().required(),
      DATABASE_TYPE: Joi.string().required(),
      DATABASE_HOST: Joi.string().required(),
      DATABASE_PORT: Joi.string().required(),
      DATABASE_USERNAME: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      DATABASE_DATABASE: Joi.string().required(),
      MAIL_HOST: Joi.string().required(),
      MAIL_PORT: Joi.string().required(),
      MAIL_USER: Joi.string().required(),
      MAIL_PASS: Joi.string().required(),
      MAIL_SERVICE: Joi.string().required(),
      REDIS_HOST:Joi.string().required(),
      REDIS_PORT:Joi.string().required(),
      GITHUB_CLIENT_ID:Joi.string().required(),
      GITHUB_CLIENT_SECRET:Joi.string().required(),
      HOST: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
  get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }
  getString(key:string):string {
    return this.envConfig[key]
  }
  /**
   * 返回多个配置
   *
   * @param {[string]} keys
   * @returns
   * @memberof ConfigService
   */
  getKeys(keys: string[]) {
    let obj = {};
    keys.forEach((item)=>{
      if(this.envConfig[item]) {
        obj[item] = this.envConfig[item];
      }
    });
    return obj;
  }
}

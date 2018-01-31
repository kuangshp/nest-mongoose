import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	await app.listen(4000, () => console.log('服务已经启动:localhost:4000'));
}
bootstrap();

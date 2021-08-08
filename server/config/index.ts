import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();

if (env.error) {
  throw new Error('⚠️ .env 파일 설정을 마치셨나요..? ⚠️');
}

export default {
  port: parseInt(process.env.PORT as string, 10),
};

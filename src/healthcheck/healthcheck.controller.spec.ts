import { Test, TestingModule } from '@nestjs/testing';
import { HealthcheckController } from './healthcheck.controller';

describe('HealthcheckController', () => {
  let appController: HealthcheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
    }).compile();

    appController = app.get<HealthcheckController>(HealthcheckController);
  });

  describe('root', () => {
    it('should return success', () => {
      expect(appController.getHello()).toBe(JSON.stringify({ success: true }));
    });
  });
});

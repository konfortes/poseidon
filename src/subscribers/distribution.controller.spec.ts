import { Test, TestingModule } from '@nestjs/testing';
import { DistributionController } from './distribution.controller';

describe('DistributionController', () => {
  let controller: DistributionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistributionController],
    }).compile();

    controller = module.get<DistributionController>(DistributionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

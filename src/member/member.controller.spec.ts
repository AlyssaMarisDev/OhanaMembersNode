import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { GetMemberById } from './services/get-member-by-id.service';
import { GetAllMembers } from './services/get-all-members.service';
import { UpdateMember } from './services/update-member.service';
import { MemberService } from './member.service';
describe('MemberController', () => {
  let appController: MemberController;

  const expectedResult = { id: 1, name: 'John Doe', gender: 'male', age: 30 };

  beforeEach(async () => {
    const mockMemberRepository = {
      findOneBy: jest.fn((criteria) => {
        if (criteria.id === 1) {
          return expectedResult;
        }
        return null;
      }),
      find: jest.fn(() => [expectedResult]),
      update: jest.fn(() => expectedResult),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        MemberService,
        GetMemberById.Handler,
        GetAllMembers.Handler,
        UpdateMember.Handler,
        {
          provide: getRepositoryToken(Member),
          useValue: mockMemberRepository,
        },
      ],
    }).compile();

    appController = app.get<MemberController>(MemberController);
  });

  describe('get a single member', () => {
    it('should return a single member', () => {
      expect(appController.findOne('1')).resolves.toEqual(expectedResult);
    });
  });

  describe('get all members', () => {
    it('should return all members', () => {
      expect(appController.findAll()).resolves.toEqual([expectedResult]);
    });
  });

  describe('update a member', () => {
    it('should update a member', () => {
      expect(appController.update('1', expectedResult)).resolves.toEqual(expectedResult);
    });
  });
});

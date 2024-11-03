import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetMemberById } from './services/get-member-by-id.service';
import { UpdateMember } from './services/update-member.service';
import { GetAllMembers } from './services/get-all-members.service';

@Module({
    imports: [TypeOrmModule.forFeature([Member])],
    controllers: [MemberController],
  providers: [
    MemberService,
    GetAllMembers.Handler,
    GetMemberById.Handler,
    UpdateMember.Handler,   
  ],
})
export class MemberModule {}

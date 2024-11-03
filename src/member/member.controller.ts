import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './member.entity';
import { GetMemberById } from './services/get-member-by-id.service';
import { GetAllMembers } from './services/get-all-members.service';
import { UpdateMember } from './services/update-member.service';

@Controller('members')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly getMemberById: GetMemberById.Handler,
    private readonly getAllMembers: GetAllMembers.Handler,
    private readonly updateMember: UpdateMember.Handler,
  ) {}

  @Get()
  async findAll(): Promise<GetAllMembers.Response[]> {
    return this.getAllMembers.run();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetMemberById.Response> {
    return this.getMemberById.run(id);
  }

  @Post()
  async create(@Body() member: Member): Promise<Member> {
    return this.memberService.create(member);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() member: UpdateMember.Request): Promise<UpdateMember.Response> {
    return this.updateMember.run(id, member);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.memberService.remove(id);
  }
}

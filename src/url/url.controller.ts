/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UrlService } from './url.service';
import { JwtGuard} from '../user/guard'; // Assuming you have an authentication guard

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(JwtGuard)
  @Post('shorten')
  shortenUrl(@Body('longUrl') longUrl: string, @Request() req: any) {
    const userId = req.user.id; // Assuming you store user ID in the JWT payload
    return this.urlService.shortenUrl(longUrl, userId);
  }


}
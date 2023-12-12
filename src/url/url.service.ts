/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as shortid from 'shortid'; // Import the shortid library
import { Url, UrlDocument } from '../url/schema/url.schema';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async shortenUrl(longUrl: string, userId: string): Promise<UrlDocument> {
    const shortUrl = this.generateShortUrl(); // Use the shortid library to generate a short URL
    const url = new this.urlModel({ longUrl, shortUrl, userId });
    return await url.save();
  }



  private generateShortUrl(): string {
    // Use shortid to generate a unique and short identifier
    return shortid.generate();
  }
}

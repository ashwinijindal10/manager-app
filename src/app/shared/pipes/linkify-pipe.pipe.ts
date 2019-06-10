import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify',
  pure: false
})
export class LinkifyPipe implements PipeTransform {
  // tslint:disable-next-line: max-line-length
  // urls: any = /(\b(https?|http|ftp|ftps|Https|rtsp|Rtsp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim; // Find/Replace URL's in text
  // TODO: find a better way to fix this issue instead of disabling it
  // tslint:disable-next-line: max-line-length
  urls: any = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
  hashtags: any = /(^|\s)(#[a-z\d][\w-]*)/gi; // Find/Replace #hashtags in text
  mentions: any = /(^|\s)(@[a-z\d][\w-]*)/gi; // Find/Replace @Handle/Mentions in text
  emails: any = /(\S+@\S+\.\S+)/gim; // Find/Replace email addresses in text
  transform(text: string) {
    return this.parseUrl(text);
  }

  private parseUrl(text: string) {
    // Find/Replace URL's in text
    if (text.match(this.urls)) {
      text = text.replace(this.urls, function replacer($1, $2, $3) {
        let url: any = $1;
        const urlClean: any = url.replace('' + $3 + '://', '');
        const pattern = /^((http|https):\/\/)/;
        if (!pattern.test(url)) {
          url = 'http://' + url;
        }
        return '<a href="' + url + '" target="_blank">' + urlClean + '</a>';
      });
    }

    // Find/Replace @Handle/Mentions in text
    if (text.match(this.hashtags)) {
      text = text.replace(
        this.hashtags,
        '<a href="/search/hashtag/$2" class="hashtag-link">$1$2</a>'
      );
    }

    // Find/Replace #hashtags in text
    if (text.match(this.mentions)) {
      text = text.replace(
        this.mentions,
        '<a href="/search/handle/$2" class="handle-link">$1$2</a>'
      );
    }

    // Find/Replace email addresses in text
    if (text.match(this.emails)) {
      text = text.replace(this.emails, '<a href=\'mailto:$1\'>$1</a>');
    }

    return text;
  }
}

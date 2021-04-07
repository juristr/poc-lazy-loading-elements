import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PartialLoaderService {
  private readonly CMP_REGEX = /<lazyelements-demo-.*?>[\s\S\r]*<\/(lazyelements-demo-.*)>/gi;

  constructor(private http: HttpClient) {}

  getPartial(name: string) {
    return this.http.get(`/assets/partials/${name}.html`, {
      responseType: 'text',
    });
  }

  getLazyElementTags(partialContent: string) {
    const tags = [];
    let testResult;
    do {
      testResult = this.CMP_REGEX.exec(partialContent);

      if (testResult) {
        tags.push(testResult[1]);
      }
    } while (testResult);

    return tags;
  }
}

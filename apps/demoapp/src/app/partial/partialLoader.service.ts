import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PartialLoaderService {
  private readonly CMP_REGEX = /<lazyelements-demo-.*?>[\s\S\r]*<\/(lazyelements-demo-.*)>/gi;

  constructor(private http: HttpClient) {}

  getPartial(name: string) {
    // obviously this should be cached to not fetch them all the time
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

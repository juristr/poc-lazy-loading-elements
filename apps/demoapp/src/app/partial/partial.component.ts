import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PartialLoaderService } from './partialLoader.service';

import { ComponentLoaderService } from '@lazyelements-demo/shared/lazy-loader';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'lazyelements-demo-partial',
  templateUrl: './partial.component.html',
  styleUrls: ['./partial.component.css'],
})
export class PartialComponent {
  partialView$ = this.route.url.pipe(
    map((urlSegment: UrlSegment[]) => urlSegment[0].path),
    switchMap((path: string) => this.partialLoaderService.getPartial(path)),
    switchMap((partialContent) => {
      // parse tags matching the `lazyelements-demo-` prefix as those are the lazy loaded
      // elements
      const tags = this.partialLoaderService.getLazyElementTags(partialContent);

      return this.lazyComponentLoader.loadContainedCustomElements(tags).pipe(
        map(() => partialContent),
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
    }),
    tap(console.log)
  );

  constructor(
    private route: ActivatedRoute,
    private partialLoaderService: PartialLoaderService,
    private lazyComponentLoader: ComponentLoaderService
  ) {}
}

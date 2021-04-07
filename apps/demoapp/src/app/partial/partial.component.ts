import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { PartialLoaderService } from './partialLoader.service';

@Component({
  selector: 'lazyelements-demo-partial',
  templateUrl: './partial.component.html',
  styleUrls: ['./partial.component.css'],
})
export class PartialComponent {
  partialView$ = this.route.url.pipe(
    map((urlSegment: UrlSegment[]) => urlSegment[0].path),
    switchMap((path: string) => this.partialLoaderService.getPartial(path)),
    tap(console.log)
  );

  constructor(
    private route: ActivatedRoute,
    private partialLoaderService: PartialLoaderService
  ) {}
}

import {
  Compiler,
  Inject,
  Injectable,
  Injector,
  NgModuleFactory,
  NgModuleRef,
  Type,
} from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';
import { from, Observable } from 'rxjs';
import { LazyComponentDef, LAZY_CMPS_PATH_TOKEN } from './tokens';

export interface LazyCmpLoadedEvent {
  selector: string;
  componentInstance?: HTMLElement;
}

@Injectable({
  providedIn: 'root',
})
export class ComponentLoaderService {
  private componentsToLoad: Map<string, LazyComponentDef>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private loadedCmps = new Map<string, NgModuleRef<any>>();
  private elementsLoading = new Map<string, Promise<void>>();

  constructor(
    private injector: Injector,
    @Inject(LAZY_CMPS_PATH_TOKEN)
    elementModulePaths: {
      selector: string;
      loadChildren: LoadChildrenCallback;
    }[][],
    private compiler: Compiler
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ELEMENT_MODULE_PATHS = new Map<string, any>();

    const modules = elementModulePaths.reduce((prev, curr) => [
      ...prev,
      ...curr,
    ]);
    modules.forEach((lazyRegistrationEntry) => {
      ELEMENT_MODULE_PATHS.set(
        lazyRegistrationEntry.selector,
        lazyRegistrationEntry
      );
    });
    this.componentsToLoad = ELEMENT_MODULE_PATHS;
  }

  getComponentsToLoad() {
    return this.componentsToLoad.keys();
  }

  loadContainedCustomElements(tags: string[]): Observable<void[]> {
    const unregisteredSelectors = Array.from(
      this.componentsToLoad.keys()
    ).filter((s) => tags.find((x) => x.toLowerCase() === s.toLowerCase()));

    // already registered elements
    const alreadyRegistered = Array.from(this.loadedCmps.keys()).filter((s) =>
      tags.find((x) => x.toLowerCase() === s.toLowerCase())
    );

    // add the already registered in...elements won't be recreated
    // the "loadComponent(...)"
    unregisteredSelectors.push(...alreadyRegistered);

    // Returns observable that completes when all discovered elements have been registered.
    const allRegistered = Promise.all(
      unregisteredSelectors.map((s) => this.loadComponent(s))
    );
    return from(allRegistered);
  }

  /**
   * Allows to lazy load a component given it's selector (i.e. tagname).
   * If the component selector has been registered, it's according module
   * will be fetched lazily
   * @param componentTag selector of the component to load
   * @param createInstance if true, creates an element and returns it in the promise
   */
  loadComponent(componentTag: string): Promise<void> {
    if (this.elementsLoading.has(componentTag)) {
      return this.elementsLoading.get(componentTag);
    }

    if (this.componentsToLoad.has(componentTag)) {
      const cmpRegistryEntry = this.componentsToLoad.get(componentTag);

      const path = cmpRegistryEntry.lazyLoad;

      const loadPromise = new Promise<void>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (path() as Promise<NgModuleFactory<any> | Type<any>>)
          .then((elementModuleOrFactory) => {
            /**
             * With View Engine, the NgModule factory is created and provided when loaded.
             * With Ivy, only the NgModule class is provided loaded and must be compiled.
             * This uses the same mechanism as the deprecated `SystemJsNgModuleLoader` in
             * in `packages/core/src/linker/system_js_ng_module_factory_loader.ts`
             * to pass on the NgModuleFactory, or compile the NgModule and return its NgModuleFactory.
             */
            if (elementModuleOrFactory instanceof NgModuleFactory) {
              return elementModuleOrFactory;
            } else {
              try {
                return this.compiler.compileModuleAsync(elementModuleOrFactory);
              } catch (err) {
                // return the error
                reject(err);

                // break the promise chain
                throw err;
              }
            }
          })
          .then((moduleFactory) => {
            moduleFactory.create(this.injector);
            resolve();
          })
          .catch((err) => {
            this.elementsLoading.delete(componentTag);
            return Promise.reject(err);
          });
      });

      this.elementsLoading.set(componentTag, loadPromise);
      return loadPromise;
    } else if (this.loadedCmps.has(componentTag)) {
      // component already loaded
      return new Promise((resolve) => {
        resolve();
      });
    } else {
      throw new Error(
        `Unrecognized component "${componentTag}". Make sure it is registered in the component registry`
      );
    }
  }
}

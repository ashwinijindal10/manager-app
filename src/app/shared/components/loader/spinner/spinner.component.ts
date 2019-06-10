import { Component, ViewEncapsulation, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  /**
   * @description Default loading spinner template
   * @memberof LoadingSpinnerComponent
   */
  _template = `
  <div class='lds-roller'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

  /**
   * @description Loading text
   * @memberof LoadingSpinnerComponent
   */
  _loadingText = '';

  /**
   * @description Defines threhold for not to diplay if time is less than 500ms
   * @memberof LoadingSpinnerComponent
   */
  _threshold = 500;

  /**
   * @description Defines timeout to hide after time 5000ms
   * @type {number}
   * @memberof LoadingSpinnerComponent
   */
  _timeout = 0;

  /**
   * @description Defines z-index property of the loading text
   * @memberof LoadingSpinnerComponent
   */
  _zIndex = 9999;

  /**
   * @description Sets z-index for input text
   * @memberof LoadingSpinnerComponent
   */
  @Input() public set zIndex(value: number) {
    this._zIndex = value;
  }

  /**
   * @description returns z-index for input text
   * @readonly
   * @memberof Ng4LoadingSpinnerComponent
   */
  public get zIndex(): number {
    return this._zIndex;
  }

  /**
   * @description Accepts custom template
   * @memberof LoadingSpinnerComponent
   */
  @Input()
  public set template(value: string) {
    this._template = value;
  }

  /**
   * @description Gives the current template
   * @readonly
   * @memberof LoadingSpinnerComponent
   */
  public get template(): string {
    return this._template;
  }

  /**
   * @description Accepts loading text string
   * @memberof LoadingSpinnerComponent
   */
  @Input()
  public set loadingText(value: string) {
    this._loadingText = value;
  }

  /**
   * @description Gives loading text
   * @readonly
   * @memberof LoadingSpinnerComponent
   */
  public get loadingText(): string {
    return this._loadingText;
  }

  /**
   * @description Accepts external threshold
   * @memberof LoadingSpinnerComponent
   */
  @Input()
  public set threshold(value: number) {
    this._threshold = value;
  }

  /**
   * @description
   * @readonly
   * @memberof LoadingSpinnerComponent
   */
  public get threshold(): number {
    return this._threshold;
  }

  /**
   * @description Accepts external timeout
   * @memberof LoadingSpinnerComponent
   */
  @Input()
  public set timeout(value: number) {
    this._timeout = value;
  }

  /**
   * @description
   * @readonly
   * @type {number}
   * @memberof LoadingSpinnerComponent
   */
  public get timeout(): number {
    return this._timeout;
  }

  /**
   * Subscription
   * @memberof LoadingSpinnerComponent
   */
  subscription: Subscription;

  /**
   * @description Show/hide spinner
   * @memberof LoadingSpinnerComponent
   */
  showSpinner = false;

  /**
   * Constructor
   * @param spinnerService Spinner Service
   * @memberof LoadingSpinnerComponent
   */
  constructor(private spinnerService: SpinnerService) {
    this.createServiceSubscription();
  }

  /**
   * Destroy function
   * @memberof LoadingSpinnerComponent
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Create service subscription
   * @memberof LoadingSpinnerComponent
   */
  createServiceSubscription() {
    let thresholdTimer: any;
    let timeoutTimer: any;

    this.subscription = this.spinnerService.getMessage().subscribe(show => {
      if (show) {
        if (thresholdTimer) {
          return;
        }
        thresholdTimer = setTimeout(
          function() {
            thresholdTimer = null;
            this.showSpinner = show;
            if (this.timeout !== 0) {
              timeoutTimer = setTimeout(
                function() {
                  timeoutTimer = null;
                  this.showSpinner = false;
                }.bind(this),
                this.timeout
              );
            }
          }.bind(this),
          this.threshold
        );
      } else {
        if (thresholdTimer) {
          clearTimeout(thresholdTimer);
          thresholdTimer = null;
        }
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        timeoutTimer = null;
        this.showSpinner = false;
      }
    });
  }
}

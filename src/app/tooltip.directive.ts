import {
  Directive,
  HostListener,
  Input,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
  ComponentRef,
  OnDestroy,
} from "@angular/core";
import { Map } from "./map.interface";
import { TooltipComponent } from "./tooltip/tooltip.component";

@Directive({
  selector: "[appTooltip]",
})
export class TooltipDirective implements OnDestroy {
  private tooltipRef: HTMLElement | null;
  private tooltipComponentRef: ComponentRef<TooltipComponent> | null;
  @Input("appTooltip") tooltipData: Map;

  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.tooltipRef = null;
    this.tooltipComponentRef = null;
    this.tooltipData = {} as Map;
  }

  ngOnDestroy() {
    this.clear();
  }

  @HostListener("mouseenter")
  show() {
    this.tooltipRef = document.createElement("app-tooltip");
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      TooltipComponent
    );
    this.tooltipComponentRef = factory.create(
      this.injector,
      [],
      this.tooltipRef
    );
    this.applicationRef.attachView(this.tooltipComponentRef.hostView);
    this.tooltipComponentRef.instance.tooltip = this.tooltipData;

    document.body.appendChild(this.tooltipRef);
  }

  @HostListener("mousemove", ["$event"])
  update(ev: MouseEvent) {
    if (this.tooltipRef) {
      this.tooltipRef.style.top =
        ev.pageY - this.tooltipRef.offsetHeight - 20 + "px";
      this.tooltipRef.style.left =
        ev.pageX - this.tooltipRef.offsetWidth / 2 + "px";
    }
  }

  @HostListener("mouseleave")
  hide() {
    this.clear();
  }

  private clear() {
    if (this.tooltipRef && this.tooltipComponentRef) {
      document.body.removeChild(this.tooltipRef);
      this.applicationRef.detachView(this.tooltipComponentRef.hostView);
      this.tooltipRef = null;
    }
  }
}

import type { ReactNode } from 'react';

type BrowserMockProps = {
  children: ReactNode;
  title?: string;
  badge?: string;
  className?: string;
};

/** 浏览器窗口外框，用来承载控制台截图或自绘 UI */
export function BrowserMock({ children, title, badge, className = '' }: BrowserMockProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-card ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-3 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-intent-high/60" />
          <i className="size-2.5 rounded-full bg-intent-mid/60" />
          <i className="size-2.5 rounded-full bg-teal/50" />
        </span>
        {title && (
          <p className="truncate text-[0.7rem] text-ink-faint sm:text-xs">{title}</p>
        )}
        {badge && (
          <span className="ml-auto shrink-0 rounded bg-brand-soft px-1.5 py-0.5 text-[0.65rem] font-medium text-brand">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

type PhoneMockProps = {
  children: ReactNode;
  className?: string;
  /** 屏幕圆角内的内容是否需要裁切 */
  clip?: boolean;
  /**
   * 自绘内容（非截图）时锁定屏幕比例。
   * 截图本身带固有比例，无需开启。
   */
  lockRatio?: boolean;
};

/**
 * iPhone 外框：深色机身 + 灵动岛。屏幕比例对齐真机 443:960。
 * 灵动岛画在屏幕内并全部用相对单位，宽度取屏宽的 31.8%、自身比例 141:42、
 * 顶距取屏高的 1.3%，与 iPhone 15 Pro 的实际比例一致，因此任意尺寸下都不会走形。
 */
export function PhoneMock({
  children,
  className = '',
  clip = true,
  lockRatio = false,
}: PhoneMockProps) {
  return (
    <div
      className={`relative rounded-[2.2rem] border border-white/10 bg-[#0a0b0f] p-[0.4rem] shadow-float ${className}`}
    >
      <div
        className={`relative rounded-[1.85rem] bg-bg ${clip ? 'overflow-hidden' : ''} ${
          lockRatio ? 'aspect-443/960' : ''
        }`}
      >
        {children}
        <span
          className="absolute top-[1.3%] left-1/2 z-20 aspect-141/42 w-[31.8%] -translate-x-1/2 rounded-full bg-black"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

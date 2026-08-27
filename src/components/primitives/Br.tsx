/**
 * 仅在宽屏生效的换行。窄屏下 display:none 会让 <br> 不产生断行，
 * 交给 text-wrap: balance 自然折行，避免中文标题被硬断成短行。
 */
export function Br({ at = 'md' }: { at?: 'sm' | 'md' | 'lg' }) {
  const cls = { sm: 'hidden sm:inline', md: 'hidden md:inline', lg: 'hidden lg:inline' }[at];
  return <br className={cls} />;
}

import classes from './page-layout.module.scss';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return <div className={classes.PageLayout}>{children}</div>;
}

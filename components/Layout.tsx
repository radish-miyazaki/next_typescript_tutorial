import React, {ReactNode} from 'react';
import Head from 'next/head'
import styles from '../styles/Layout.module.css'

type LayoutProps = {
  title: string;
  keywords: string;
  description: string;
  children?: ReactNode
}

const Layout = (props: LayoutProps) => {
  const { title, keywords, description, children } = props

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events'
}
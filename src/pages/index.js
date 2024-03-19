import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { Info } from './Info';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`안녕하세요 프런트엔드 개발자 정민영입니다. ${siteConfig.title}`}
      description='안녕하세요 프런트엔드 개발자 정민영입니다.  <head />'
    >
      <Info />
    </Layout>
  );
}

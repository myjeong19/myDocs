import classes from './Info.module.css';

import { Container } from '../components/ui/Container';
import { CustomLink } from '../components/ui/CustomLink';

export const Info = () => {
  return (
    <Container ContainerTag='header' InnerTitleTag='h1' title='소개'>
      <section className={classes.section}>
        <p>
          안녕하세요. <br />
          <strong>프런트엔드 개발</strong>을 지망하는 <strong>정민영</strong>
          입니다.
        </p>
        <p>
          사용자가 직관적으로 이해하고 편안하게 사용할 수 있는, UI/UX 디자인에
          깊은 관심을 가지고 있습니다. <br />
          또한, Post CSS를 사용하는 것을 좋아합니다.
          <br />
          동료들과 지속적으로 피드백을 주고받으며, 함께 성장해 나가는 과정을
          소중히 여깁니다.
          <br />
        </p>
      </section>

      <nav className={classes.nav}>
        <CustomLink href='https://myjeong19.oopy.io/'>Blog</CustomLink>
        <CustomLink href='https://github.com/myjeong19'>Github</CustomLink>
      </nav>
    </Container>
  );
};

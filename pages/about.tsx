import { getLayoutDefault } from "../layouts/LayoutDefault/LayoutDefault";
import { PageHead } from "../components/PageHead/PageHead";
import styles from "./../styles/About.module.css";

const About = (): JSX.Element => {
  return (
    <div className={styles["about__Container"]}>
      <PageHead title={"Country Insight - About"} content={"About page"} />
      <h2>Country Insight</h2>
      <p>
        This website is created to inform users about countries and let them
        share their experiences in these countries
      </p>
      <h3>Front-end</h3>
      <ul>
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>Material UI</li>
      </ul>
      <h3>APIs</h3>
      <ul>
        <li>
          <a href="https://restcountries.com/" target="_blank">
            Rest Countries
          </a>
          <ul>
            <li>Getting country informations on this API</li>
          </ul>
        </li>
        <li>
          <a href="https://pixabay.com/" target="_blank">
            Pixabay
          </a>
          <ul>
            <li>Getting country photos on this API</li>
          </ul>
        </li>
        <li>
          <a href="https://en.wikipedia.org/w/api.php" target="_blank">
            Wikipedia
          </a>
          <ul>
            <li>Getting more information about countries on this API</li>
          </ul>
        </li>
      </ul>
      <h3>Authentication</h3>
      <ul>
        <li>Firebase Authentication</li>
      </ul>
      <h3>Database</h3>
      <ul>
        <li>Firebase Firestore</li>
      </ul>
      <h3>Contact</h3>

      <a href="mailto: ozanbilgic1535@gmail.com">ozanbilgic1535@gmail.com</a>
    </div>
  );
};

export default About;

About.getLayout = getLayoutDefault;

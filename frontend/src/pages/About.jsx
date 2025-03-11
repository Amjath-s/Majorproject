import "../Style/about.css";
import NavBar from "../Component/NavBar";
function About() {
  return (
    <>
      <NavBar />
      <div id="about" className="abouts">
        <div className="aiminfo">
          <h4>OUR AIM </h4>
          <p>
            AI-powered learning platform designed to provide personalized,
            interactive learning experiences for students with disability. The
            platform leverages advanced AI technologies to facilitate
            response-based interactions, featuring engaging animated video
            responses that adapt to the student's behavior and learning
            preferences.
          </p>
        </div>

        <div className="missioninfo">
          <h4>OUR MISSION </h4>
          <p>
            {" "}
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC.{" "}
          </p>
        </div>
        <div className="someinfo">
          <h4>SOMEINFO</h4>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable
          </p>
        </div>
      </div>
    </>
  );
}
export default About;

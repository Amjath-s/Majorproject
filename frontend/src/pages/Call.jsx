import '../Style/call.css'
import "../Component/NavBar"

function Call()
{
    return (
      <>
        <NavBar/>
        <div id="contact" className="contacts">
          <div className="contact-form">
            <h1>Get in touch</h1>
            <p>Let's talk about your project</p>
            <form>
              <input type="text" placeholder="Your name" />
              <input type="tel" placeholder="Your phone number" />
              <input type="email" placeholder="Your email" />
              <textarea placeholder="Your message"></textarea>
              <button type="submit">SUBMIT</button>
            </form>
            <address>Sunflower Office | Przemysla 14, Warsaw, Poland</address>
          </div>
        </div>
      </>
    );

}
export default Call;
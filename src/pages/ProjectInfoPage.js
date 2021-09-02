import { ReactComponent as IconSmile } from "../assets/icon_smile.svg";
import "./ProjectInfoPage.css";

export default function ProjectInfoPage() {
  return (
    <section className="ProjectInfoPage">
      <p>
        Beatmatch Buddy is a tool to help upcoming vinyl record deejays. You can
        analyse the tempo of a song, save the result in your collection and
        prepare the playlist of your next gig.
      </p>
      <p>
        When spinning vinyl records it is a big help to know the tempo of a song
        and if the next song you want to play is in the same tempo range to
        avoid big jumps and make the smoothest transitions.
      </p>
      <p>
        The times where you have to write notes on record covers are over now!
      </p>

      <ul>
        by John Goehner
        <li>
          <a href="mailto:john.goehner@gmx.de" target="_blank" rel="noreferrer">
            Mail
          </a>
        </li>
        <li>
          <a
            href="https://github.com/johnxgaehner"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/john-göhner-9022a3219/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </li>
      </ul>
      <IconSmile className="ProjectInfoPage__IconSmile" />
    </section>
  );
}

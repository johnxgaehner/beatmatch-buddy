import "./HowToUsePage.css";
import { ReactComponent as IconPlusCircle } from "../assets/icon_plus_circle_filled.svg";

export default function HowToUsePage() {
  return (
    <section className="HowToUsePage">
      <p>
        Beatmatch Buddy calculates the tempo for you. All you have to do is to
        tap the "Tap Here" field in your analyse page along with the beat of the
        song. The tempo will be shown one row below as you tap.
      </p>
      <p>Add track title, artist name, record title and submit your track!</p>
      <p>
        All your saved tracks are stored in your collection. Search your
        collection for a keyword, sort it or filter within a tempo range.
      </p>
      <p>
        Click on the <IconPlusCircle className="IconPlusCircle" /> on the right
        and you can add the track to a playlist. If you haven't yet, you can
        create a new playlist on the fly.
      </p>
      <p>
        To prepare your set, go to your playlists archive and navigate into the
        playlist. You are now able to see which tracks you have added, change
        the track order by drag & drop and if you missed some tracks, just click
        "Add Tracks" and add as many more as you want.
      </p>
      <p>A lot more functions are waiting for you!</p>
    </section>
  );
}

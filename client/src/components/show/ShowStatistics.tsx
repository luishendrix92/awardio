import { propEq, any, pathEq } from "ramda";
import Award from "../../models/Award";

interface PollingResults {
  luisGuesses: number;
  erinGuesses: number;
  misses: number;
  ties: number;
}

interface ShowStatisticsProps {
  awards: Award[]
}

function computeResults(awards: Award[]): PollingResults {
  return awards.reduce((results: PollingResults, award: Award) => {
    const { winnerEntryId, entries } = award;
    const winnerEntry = entries?.find( propEq('id', winnerEntryId));

    const luisGuessed = any(pathEq(['voter', 'id'], 7), winnerEntry?.votes || []);
    const erinGuessed = any(pathEq(['voter', 'id'], 5), winnerEntry?.votes || []);

    if (luisGuessed || erinGuessed) {
      luisGuessed && results.luisGuesses++;
      erinGuessed && results.erinGuesses++;
      luisGuessed && erinGuessed && results.ties++;
    } else {
      results.misses++;
    }

    return results;
  }, { luisGuesses: 0, erinGuesses: 0, misses: 0, ties: 0 });
}

function ShowStatistics({ awards }: ShowStatisticsProps) {
  const { luisGuesses, erinGuesses, misses, ties } = computeResults(awards);
  const awardCount = awards.length;

  return (
    <div className="ui four statistics">
      <div className="statistic">
        <div className="value">
          <img
            src="https://semantic-ui.com/images/avatar/small/elliot.jpg"
            className="ui circular inline image"
            alt="luis_avatar"
          /> {luisGuesses} / {awardCount}
        </div>
        <div className="label">Luis' Guesses</div>
      </div>
      <div className="statistic">
        <div className="value">
          <img
            src="https://semantic-ui.com/images/avatar/small/veronika.jpg"
            className="ui circular inline image"
            alt="erin_avatar"
          /> {erinGuesses} / {awardCount}
        </div>
        <div className="label">Erin's Guesses</div>
      </div>
      <div className="statistic">
        <div className="value">
          <i className="frown outline icon"></i> {misses}
        </div>
        <div className="label">Missed Guesses</div>
      </div>
      <div className="statistic">
        <div className="value">
          <i className="meh outline icon"></i> {ties}
        </div>
        <div className="label">Tied Guesses</div>
      </div>
    </div>
  );
}

export default ShowStatistics;

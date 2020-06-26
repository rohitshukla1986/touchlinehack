import { createStyles, FormControl, MenuItem, Select, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import SecurityIcon from '@material-ui/icons/Security';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import StarsIcon from '@material-ui/icons/Stars';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import React, { useEffect } from 'react';
import Timer from 'react-compound-timer';
import './App.scss';
/* ES5 */
var htmlToImage = require('html-to-image');

export interface Player {
  firstName: string;
  secondName: string;
  number: number;
}

function App() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      actionButton: {
        marginBottom: "10px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "5px;",
        marginRight: "5px;"
      },
      formControl: {
        width: 200,
      },
      dropDownField: {
        fontSize: '1rem',
        marginLeft: '5px',
        width: '100%'
      },
      textField: {
        width: "90%"
      }
    })
  );

  const [goalButtonClicked, setGoalButtonClicked] = React.useState(false);
  const [goalScorer, setGoalScorer] = React.useState<string>("");
  const [scorers, setScorers] = React.useState<string[]>([]);
  const [scoreTimes, setScoreTimes] = React.useState<string[]>([]);
  const [comment, setComment] = React.useState<string>("");
  const [comments, setComments] = React.useState<string[]>([]);
  const [scoreMilliseconds, setScoreMilliseconds] = React.useState<string>("");
  const [scoreTime, setScoreTime] = React.useState<string>("");
  const [score, setScore] = React.useState(0);
  const [image, setImage] = React.useState({});

  useEffect(() => {
    const date = new Date(scoreMilliseconds);
    setScoreTime(date.getMinutes().toString());
  }, [scoreMilliseconds]);

  function handleGoalButtonClick() {
    setGoalButtonClicked(true);
  }

  function handleGoalScorerChange(evt: any) {
    setGoalScorer(evt.target.value)
  }

  function handleComments(evt: any) {
    setComment(evt.target.value)
  }

  function handleConfirmGoal() {
    setScore(s => s + 1);
    setScorers(x => [...x, goalScorer]);
    setScoreTimes(x => [...x, scoreTime]);
    setComments(x => [...x, comment]);
    setComment("");
    setGoalScorer("");
    setGoalButtonClicked(false);

  }

  const classes = useStyles();

  return (

    <div className="main-container">
      <div className="versus-container">
        <div className="team-name-container">
          <StarsIcon className="versus-icon"></StarsIcon>
          <p>Madrid Utd</p>
        </div>
        <p><b>VS</b></p>
        <div className="team-name-container">
          <p>Liverpool City</p>
          <SecurityIcon className="versus-icon"></SecurityIcon>
        </div>
        <div className="versus-teamAway"></div>
      </div>

      <div className="score-widget-container">
        <link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'/>
        <div className="timer-container">
          <Timer
            initialTime={0}
          >
            {({ start, resume, pause, stop, reset, getTime }) => (
              <React.Fragment>
                <div className="timer-digits">
                  <Timer.Minutes /> : <Timer.Seconds />
                </div>
                <br />
                <div>
                  <button className="timer-button" onClick={start}>Start</button>
                  <button className="timer-button" onClick={stop}>Stop</button>
                  <button className="timer-button" onClick={reset}>Reset</button>
                </div>
                {
                  goalButtonClicked ? setScoreMilliseconds(getTime()) : null
                }
              </React.Fragment>
            )}
          </Timer>
        </div>

        <div className="score-main-container">
          <div className="score-item-container">
            <p className="score-text">Home</p>
            <div className="score-container">{score}</div>
          </div>
          <div className="score-item-container">
            <p className="score-text">Away</p>
            <div className="score-container">0</div>
          </div>
        </div>
        <div className="scorer-container">
          {
            scorers && scorers.map((player: string, i: number) => {
              return(
                <div className={"scorer"}>
                  <p>{player === "Michael Beckham" ? "13" : player === "Lionel Ronaldo" ? "20" : ""} {player} {scoreTimes[i]}"</p>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="action-container">
        <Button className={classes.actionButton} onClick={handleGoalButtonClick} variant="contained">
          <div className="button-container">
            <p className="button-header">Goal</p>
            <SportsSoccerIcon className="action-icon"></SportsSoccerIcon>
          </div>
        </Button>
        <Button className={classes.actionButton} variant="contained">
          <div className="button-container">
            <p className="button-header">Change</p>
            <TransferWithinAStationIcon className="action-icon"></TransferWithinAStationIcon>
          </div>
        </Button>
        <Button className={classes.actionButton} variant="contained">
          <div className="button-container">
            <p className="button-header">Foul</p>
            <CancelIcon className="action-icon"></CancelIcon>
          </div>
        </Button>
      </div>

      {goalButtonClicked ?
        <div className="goal-template-container">
          <div className="goal-scorer-dropdown-container">

            <div className='dropdown-container'>
              <p className="goal-scorer-header">Goal Scorer</p>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select className={classes.dropDownField}
                        value={goalScorer}
                        onChange={(evt: any) => handleGoalScorerChange(evt)}
                >
                  <MenuItem className={classes.dropDownField} value={''}></MenuItem>
                  <MenuItem className={classes.dropDownField} value={'Michael Beckham'}>Michael Beckham</MenuItem>
                  <MenuItem className={classes.dropDownField} value={'Lionel Ronaldo'}>Lionel Ronaldo</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div  className="canvas-container">
            <div id="my-node" className="canvas-background"></div>
            <div className={goalScorer === "Michael Beckham" ? "canvas-middle-A" : goalScorer === "Lionel Ronaldo" ? "canvas-middle-B" : "canvas-middle-empty"}></div>
            <div className="canvas-foreground"></div>
          </div>

          {goalScorer !== "" ?
            <div className={"textField-container"}>
              <TextField
                className={classes.textField}
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
                variant="outlined"
                onChange={handleComments}
              />
            </div> : <></>
          }

          { goalScorer !== "" ?
            <div className="confirm-button-container">
              <Button variant="contained" color="primary"
                      onClick={handleConfirmGoal}
              >
                Confirm Goal
              </Button>
            </div>: <></>
          }
        </div> : <></>}
    </div>
  );
}

export default App;

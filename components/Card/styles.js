import css from "styled-jsx/css"

import { fonts } from "../../styles/theme"

export const globalStyles = css.global`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${fonts.base};
  }

  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
  .shape {
    fill-opacity: 0.3;
  }
  .shape:hover {
    fill-opacity: 0.65;
    z-index: 100;
  }
  .scale {
    fill: #fafafa;
    stroke: #999;
    stroke-width: 0.2;
  }
  .axis {
    stroke: #555;
    stroke-width: 0.2;
  }
  .dot {
    fill: #fff;
    stroke: #e7e8e7;
    r: 5;
    -webkit-transition: r 0.2s;
    -o-transition: r 0.2s;
    transition: r 0.2s;
  }
  .dot:hover {
    stroke: #bbb;
    r: 8;
  }
  .caption {
    fill: #444;
    font-weight: 400;
    text-shadow: 1px 1px 0 #fff;
  }
`

export default css`
  body,
  html {
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }

  .bg-image {
    /* The image used */
    background-image: url("stadium.jpg");

    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(8px);

    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  /* Position text in the middle of the page/image */
  .bg-text {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    padding: 20px;
    text-align: center;
  }

  .clubs {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
    color: white;
    text-align: center;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
  }

  .icons {
    display: inline-block;
    width: 120px;
    height: 120px;
  }

  a.icons:hover {
    background-color: rgb(196, 196, 196); /* Fallback color */
    background-color: rgba(
      207,
      203,
      203,
      0.4
    ); /* Black w/opacity/see-through */
  }

  .button1 {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 70%;
    left: 33%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 15%;
    padding: 5px;
    text-align: center;
  }

  .button2 {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 15%;
    padding: 5px;
    text-align: center;
  }

  .button3 {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 70%;
    left: 67%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 15%;
    padding: 5px;
    text-align: center;
  }

  a.button:hover {
    background-color: rgb(196, 196, 196); /* Fallback color */
    background-color: rgba(
      207,
      203,
      203,
      0.4
    ); /* Black w/opacity/see-through */
  }

  .stats {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 76%;
    left: 20%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 15%;
    padding: 5px;
    text-align: center;
  }

  .avatar {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 15%;
    padding: 5px;
    text-align: center;
  }

  .radar {
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 30%;
    padding: 5px;
    text-align: center;
  }

  .bg-dark {
    background-color: #292f43;
    color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .fw-container {
    position: relative;
    overflow: hidden;
  }

  .container-large {
    max-width: 1800px;
    margin: 20px auto;
  }

  .flex {
    display: flex;
  }

  .flex-expand > * {
    flex: 1;
  }

  .thefigure {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
  }

  .player-card-shadow {
    /*box-shadow: 0px 0px 12px 3px rgba(0,0,0,0.34); IMPORTANTE BORRAR DESPUES DE DESCARGAR LAS IMAGENES*/
  }

  .player-card {
    width: 182px;
    height: 256px;
    flex-shrink: 0;
    flex-grow: 0;
    position: relative;
    overflow: hidden;
    user-select: none;
    margin: 0;
    padding: 0;
    background-size: cover;
  }

  .player-card-name {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 28px;
    font-size: 21px;
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
    z-index: 5;
    font-family: "DINPro-Medium", "Open Sans", sans-serif;
    color: #fff;
    text-transform: uppercase;
    line-height: 28px;
    white-space: nowrap;
  }

  .player-card-ovr {
    position: absolute;
    text-align: center;
    font-size: 36px;
    font-family: "DINPro-Bold", "Open Sans", sans-serif, "MarkPro";
    font-weight: bold;
    color: #fff;
    width: 66px;
    top: 30px;
    left: 0;
    z-index: 4;
    text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
      0.5px 0.5px 0 #000;
  }

  .player-card-position {
    position: absolute;
    text-align: center;
    font-size: 25px;
    font-family: "DINPro-Bold", "Open Sans", sans-serif;
    font-weight: bold;
    color: #fff;
    width: 66px;
    top: 2px;
    left: 0;
    z-index: 4;
    text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
      0.5px 0.5px 0 #000;
  }

  .stats-col-1,
  .stats-col-2 {
    font-family: "DINPro-Bold", "Open Sans", sans-serif !important;
    font-size: 21px;
    color: #fff;
    position: absolute;
    top: 138px;
    z-index: 5;
    font-weight: bold;
  }

  .stats-col-bg {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    left: 0;
    top: 128px;
    height: 100px;
    width: 100%;
    z-index: 4;
  }

  .player-card-stats-name {
    font-family: "DINPro-Medium", "Open Sans", sans-serif !important;
    font-weight: normal;
  }

  .stats-col-2 {
    left: 94px;
  }

  .stats-col-1 {
    left: 10px;
  }

  .top-info {
    padding-left: 30px;
  }

  .top-header {
    margin: 0 0 12px 0;
    padding: 1px 0 0 0;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    line-height: 1;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
  }

  .namelink {
    text-decoration: none;
    border-bottom: 1px solid #ccc;
    transition: all 0.07s;
    -webkit-transition: all 0.07s;
    -moz-transition: all 0.07s;
    -o-transition: all 0.07s;
    text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
      0.5px 0.5px 0 #000;
  }

  .ovr {
    color: #303030;
    padding: 0px 5px;
    border-radius: 9px;
  }

  .stat_tier_3 {
    margin-top: 7px;
    background-color: #02fec5;
    stroke: #02fec5;
    color: #000;
  }

  h1 {
    font-size: 1.7em;
  }

  h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  .top-container h2 {
    margin-top: 15px;
    margin-bottom: 8px;
  }

  .bg-dark .subtle-text {
    color: white;
    text-shadow: -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000,
      0.5px 0.5px 0 #000;
  }

  a span {
    background-color: rgba(0, 0, 0, 0.5);
  }

  h2 span {
    background-color: rgba(0, 0, 0, 0.5);
  }

  p span {
    background-color: rgba(0, 0, 0, 0.5);
  }

  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  p {
    max-width: 1200px;
    line-height: 1.5;
  }

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  ul {
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  .versions-list a {
    text-decoration: none;
    display: flex;
  }

  a,
  a:link,
  a:visited,
  a:hover {
    color: inherit;
  }

  .bg-image2 {
    /* The image used */
    background-image: url("./images/bg/03.png");
  }

  .description {
    font-size: 18px;
    margin-top: 8px;
    margin-bottom: 15px;
  }

  .versions-list {
    margin: 0;
    margin-bottom: -6px;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
  }

  .versions-list-el {
    list-style: none;
    margin: 0 6px 0 0;
    margin-bottom: 6px;
    border-radius: 5px;
    -webkit-transition: background 70ms ease-out;
    -moz-transition: background 70ms ease-out;
    -o-transition: background 70ms ease-out;
  }

  .stat {
    font-weight: bold;
    text-align: center;
    padding: 2px 5px;
    border-radius: 5px;
    display: inline-block;
  }

  .stat_tier_2 {
    margin-top: 7px;
    background-color: #a8fe02;
    stroke: #a8fe02;
    color: #000;
  }

  .club-flag {
    height: 18px;
    vertical-align: top;
  }

  li.versions-list-el .game,
  img.versions-list-flag,
  li.versions-list-el .stat {
    vertical-align: middle;
    margin: 3px 3px;
    margin-right: 6px;
  }

  li.versions-list-el .game,
  img.versions-list-flag,
  li.versions-list-el .stat {
    vertical-align: middle;
    margin: 3px 3px;
    margin-right: 6px;
  }

  a,
  a:link,
  a:visited,
  a:hover {
    color: inherit;
  }

  .bg-dark li.versions-list-el {
    background: #454b5d;
  }

  .abutton {
    background: transparent;
    border: none !important;
  }

  .stat_tier_0 {
    margin-top: 7px;
    background-color: #fd3730;
    stroke: #fd3730;
    color: #000;
  }

  .player-info-column {
    flex: 0;
    padding-right: 0px;
    margin-right: 40px;
    border-right: 1px solid #ddd;
  }

  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  h4 {
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  .hexagon-container {
    width: 200px;
    margin: 0 auto;
  }

  .player-positions-new {
    display: flex;
    flex-flow: column;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .player-positions-row {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
    align-items: center;
  }

  .fw-2 {
    background: #ef1e1e;
  }

  .player-positions-item {
    display: flex;
    flex-flow: column;
    overflow: hidden;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
  }

  .player-positions-item span.pos {
    margin: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.125);
    font-weight: bold;
    text-align: center;
  }

  .content-container {
    display: block;
  }

  .player-positions-row {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
    align-items: center;
  }

  .player-info {
    border-collapse: collapse;
    width: 100%;
  }

  .player-info tr {
    border-bottom: 1px solid #ccc;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  td {
    display: table-cell;
    vertical-align: inherit;
  }

  table {
    display: table;
    border-spacing: 2px;
    border-color: grey;
  }

  .player-info td {
    padding: 9px 10px 9px 4px;
  }

  .flex-column {
    flex-flow: column;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .stats-block-container {
    margin-left: -20px;
    margin-right: -20px;
  }

  .stats-block {
    width: 33.33%;
    margin-bottom: 30px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .stat-bar {
    position: relative;
    height: 8px;
    border-radius: 5px;
    background: #e6e6e6;
    margin-bottom: 15px;
  }

  .stat_tier_2 {
    margin-top: 7px;
    background-color: #a8fe02;
    stroke: #a8fe02;
    color: #000;
  }

  .player-stats-modern {
    /* margin-right: 40px; */
    border-spacing: 0 8px;
  }

  .player-card-club-featured {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    position: relative;
    top: 26%;
    left: 4%;
    z-index: 4;
  }

  .player-card-image-featured {
    width: 100%;
    height: 240px;
    position: absolute;
    bottom: 0;
    left: 14%;
    z-index: 3;
  }

  .nav {
    margin: 0;
    padding: 0;
    overflow: hidden;
    float: left;
  }

  .custom-select {
    display: block;
    font-size: 16px;
    font-family: "Arial", sans-serif;
    font-weight: 400;
    color: #444;
    line-height: 1.3;
    padding: 0.4em 1.4em 0.3em 0.8em;
    width: 400px;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
    border-radius: 0.3em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
    margin-top: 20px;
    margin-bottom: 15px;
  }

  .custom-select::-ms-expand {
    display: none;
  }

  .custom-select:hover {
    border-color: #888;
  }

  .custom-select:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }

  .custom-select {
    font-weight: normal;
  }

  .header-container {
    width: 100%;
    background-color: #fafafa;
    box-shadow: 0 2px 4px -2px rgba(17, 17, 17, 0.15);
    position: fixed;
    top: 0;
    z-index: 500;
  }

  .header {
    height: 50px;
    width: auto;
    max-width: 1400px;
    margin: 0 auto;
    overflow: visible;
    position: relative;
  }

  .header-logo {
    border-collapse: collapse;
    float: left;
  }

  .nav2-container {
    display: none;
    position: fixed;
    z-index: 25;
    overflow: hidden;
    background: #fcfcfc;
    border-radius: 10px;
    box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
      0 30px 60px -30px rgba(0, 0, 0, 0.3),
      0 -18px 60px -10px rgba(0, 0, 0, 0.025);
  }

  .nav > li {
    float: left;
    list-style: none;
    /* font-size: 18px; */
    transition: background 70ms ease-out;
    -webkit-transition: background 70ms ease-out;
    -moz-transition: background 70ms ease-out;
    -o-transition: background 70ms ease-out;
    position: relative;
  }

  .espacio {
    margin-top: 60px;
  }

  .stat-bar-div {
    height: 100%;
    border: 0;
    left: 0;
    top: 0;
    border-radius: 5px;
  }

  .cards-container {
    margin-left: -20px;
    margin-right: -20px;
  }

  .main-stats-cards-container {
    align-items: flex-start;
  }

  .cards-container > .player-main-column {
    margin-left: 20px;
    margin-right: 20px;
    width: auto;
  }

  .player-main-column {
    vertical-align: top;
    flex: 0;
  }

  .player-index-list {
    list-style: none;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }

  .player-index-list > li {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    padding-left: 0;
    padding-right: 0;
  }

  .cards-container > .player-main-column {
    margin-left: 40px;
    margin-right: 20px;
    width: auto;
  }

  .fut-container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .fut-row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }

  .fut-col {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .fut-header-bg {
    background: rgba(0, 0, 0, 0.8);
    padding: 10px;
    border-radius: 3px;
    width: 95%;
  }

  .fut_header {
    margin-top: 5px;
    font-family: "Oswald", sans-serif !important;
    font-size: 28px;
    font-weight: 500;
    padding-left: 5px;
    margin-bottom: 5px;
  }

  .fut-col-pack {
    margin-top: 20px;
  }

  .fut-pack-area {
    background: rgba(0, 0, 0, 0.7) none repeat scroll 0% 0%;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .fut-col-card {
    flex: 0 0 25%;
    max-width: 25%;
  }

  .fut-col-pack-1 {
    background: linear-gradient(45deg, #f2f2f2, #e6e6e6);
    height: 100%;
    border-left: 2px solid #000;
    border-right: 2px solid #000;
    min-height: 444px;
    background: url("./images/pack/tri-bg.png");
    cursor: pointer;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  .fut-pack-name {
    text-align: center;
    font-family: "Oswald", sans-serif !important;
    font-size: 26px;
    color: black;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .fut-divide-line {
    height: 1px;
    background: rgba(0, 0, 0, 0.2);
  }

  ol.inline > li,
  ul.inline > li {
    display: inline-block;
    padding-left: 1px;
    padding-right: 1px;
  }

  .fut-image {
    width: 210px;
    margin-left: auto;
    margin-right: auto;
  }

  .fut-divide-bottom {
    height: 1px;
    background: rgba(0, 0, 0, 0.4);
  }

  .fut-pack-desc {
    text-align: center;
    color: white;
    padding-top: 10px;
    padding-bottom: 5px;
    font-weight: 500;
    font-size: 13px;
  }

  .fut-items {
    color: white;
    font-family: "Oswald", sans-serif !important;
    margin-right: 20px;
  }

  .fut-items.top {
    font-size: 12px;
    padding-top: 5px;
  }

  .fut-items-bottom {
    font-size: 12px;
    position: relative;
    top: -10px;
    font-weight: 300;
  }

  .fut-hex {
    background: url("./images/pack/gold_pack_shape.png") top left no-repeat;
    height: 45px;
    width: 40px;
    background-size: 45px 48px;
    font-family: "Oswald", sans-serif !important;
    color: black;
    background-position: -3px;
    margin-right: 40px;
  }

  .fut-hex-rare {
    background: url("./images/pack/rare_pack_shape.png") top left no-repeat;
    height: 45px;
    width: 40px;
    background-size: 45px 48px;
    font-family: "Oswald", sans-serif !important;
    color: white;
    background-position: -3px;
    background-position-x: -3px;
    background-position-y: center;
    margin-right: 40px;
  }

  .fut-choose {
    background: rgba(0, 0, 0, 0.7) none repeat scroll 0% 0%;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }

  #canvas-wrap {
    position: relative;
  } /* Make this a positioned parent */
  #overlay {
    position: absolute;
    top: 20px;
    left: 30px;
  }

  .playerimage {
  }

  .fut-player-row {
    display: flex;
    flex-wrap: wrap;
    margin-right: 15px;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .fut-cards {
    justify-content: center;
  }

  .fut-divide {
    width: 10px;
    background: rgba(0, 0, 0, 0.2);
  }

  .buttonlogin {
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(66, 49, 250, 0.2); /* Black w/opacity/see-through */
    color: white;
    font-weight: bold;
    border: 3px solid #f1f1f1;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 30%;
    padding: 5px;
    text-align: center;
  }

  h3:first-child,
  h4:first-child {
    margin-top: 0;
  }

  @media (max-width: 767px) {
    .bg-dark {
      background-position: top left, bottom right;
    }
  }

  @media (max-width: 767px) {
    .bg-dark {
      background-size: 100%;
    }
  }

  @media (max-width: 1023px) {
    .bg-dark {
      background-color: orange;
      background-position: center;
      background-size: 0px;
    }
  }

  @media (max-width: 767px) {
    .top-container {
      flex-direction: column;
    }
  }

  @media (max-width: 1439px) {
    .header,
    .container-large {
      width: auto;
      margin-left: 20px;
      margin-right: 20px;
    }
  }

  @media (max-width: 767px) {
    .top-container > .player-card {
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (max-width: 767px) {
    .top-info {
      padding-left: 0;
      margin-top: 20px;
    }
  }

  @media (max-width: 800px) {
    .top-header {
      font-size: 19px;
    }
  }

  @media (max-width: 800px) {
    h2 {
      font-size: 1.25em;
    }
  }

  @media (max-width: 1023px) {
    .main-stats-cards-container {
      flex-direction: column;
    }
  }

  @media (max-width: 1439px) {
    .header,
    .container-large {
      width: auto;
      margin-left: 20px;
      margin-right: 20px;
    }
  }

  @media (max-width: 800px) {
    .player-main-column.player-info-column,
    .player-main-column.stats {
      width: 100%;
      overflow: hidden;
    }
  }

  @media (max-width: 1023px) {
    .player-info-column {
      margin-top: 20px;
      margin-bottom: 20px;
      border: none;
      order: 2;
    }
  }

  @media (max-width: 800px) {
    .player-main-column {
      width: 49%;
      display: block;
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    .player-info-column {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    .player-main-column {
      width: 32%;
      padding: 0;
    }
  }

  @media (max-width: 1000px) {
    .player-main-column {
      padding-right: 20px;
    }
  }

  @media (max-width: 767px) {
    .stats-block {
      width: 100%;
    }
  }

  @media (max-width: 1439px) {
    .stats-block {
      padding-left: 20px;
      padding-right: 20px;
      box-sizing: border-box;
    }
  }

  @media (max-width: 767px) {
    .cards-container {
      flex-direction: column;
    }
  }

  @media (max-width: 800px) {
    h3:first-child,
    h4:first-child {
      margin-top: 0;
    }
  }

  @media (max-width: 800px) {
    h3,
    h4 {
      margin: 15px 0;
    }
  }
`

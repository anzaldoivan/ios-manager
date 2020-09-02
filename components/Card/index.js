import React, { useState, useEffect } from "react"

import html2canvas from "html2canvas"
import { saveAs } from "file-saver"

import styles, { globalStyles } from "./styles"

const TheCard = (props) => {
  const [profileState, setProfileState] = useState(props)

  useEffect(() => {
    setProfileState(props)
  }, [props])

  const printPDF = () => {
    html2canvas(document.querySelector("#ThePlayerCard")).then(function (
      canvas9
    ) {
      var playerimage = canvas9.toDataURL("image/png")
      window.saveAs(playerimage, `${props.tID}_${props.playerID}.png`)
    })
  }

  return (
    <>
      <div
        id="ThePlayerCard"
        className="thefigure player-card player-card-shadow player-card-large bg-image2"
        style={{
          backgroundImage:
            props.ovr >= 90
              ? `url(/bg/0.png)`
              : props.ovr >= 80 && props.ovr < 90
              ? `url(/bg/03.png)`
              : props.ovr >= 70 && props.ovr < 80
              ? `url(/bg/04.png)`
              : `url(/bg/05.png)`,
        }}
        onClick={printPDF}
      >
        <div className="player-card-position">{props.pos}</div>
        <div className="player-card-ovr">{props.ovr}</div>
        <div className="player-card-name">{props.name}</div>
        <img
          className="player-card-club-featured"
          src={"/clubs/" + `${props.team}` + ".png"}
        ></img>
        <img
          className="player-card-image-featured"
          src={"/cartas/" + `${props.id}` + ".png"}
        ></img>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

export default TheCard

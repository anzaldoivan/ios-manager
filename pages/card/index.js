import React, { useState, useEffect } from "react"
import {
  doSomethingWithInput,
  justAnAlert,
  steamid_to_64bit,
  getSeason,
  getTeam,
  getBanner,
  getSkill,
  getPosition,
  getOverall,
} from "components/Util/Util"
import html2canvas from "html2canvas"
import { saveAs } from "file-saver"

import RadarChart from "react-svg-radar-chart"
// import "react-svg-radar-chart/build/css/index.css"

import styles, { globalStyles } from "components/Card/styles"
import TheCard from "components/Card"

// importamos AXIOS que nos sirve hacer los fetch con las API

function Card() {
  // Creamos los hooks que usaremos a lo largo de todo el programa para identificar las estadisticas
  const [name, setName] = useState(0)
  const [team, setTeam] = useState(0)
  const [steamID, setSteamID] = useState(0)
  const [goals, setGoals] = useState(0)
  const [matches, setMatches] = useState(0)
  const [assists, setAssists] = useState(0)
  const [shots, setShots] = useState(0)
  const [shotsontarget, setShotsontarget] = useState(0)
  const [passes, setPasses] = useState(0)
  const [passescompleted, setPassescompleted] = useState(0)
  const [interceptions, setInterceptions] = useState(0)
  const [fouls, setFouls] = useState(0)
  const [offsides, setOffsides] = useState(0)
  const [tackles, setTackles] = useState(0)
  const [tacklescompleted, setTacklescompleted] = useState(0)
  const [possession, setPossession] = useState(0)
  const [saves, setSaves] = useState(0)
  const [savescaught, setSavescaught] = useState(0)
  const [goalsconceded, setGoalsconceded] = useState(0)
  const [secondsplayed, setSecondsplayed] = useState(0)
  const [distance, setDistance] = useState(0)
  const [totalmatches, setTotalmatches] = useState(0)

  const [passavg, setPassavg] = useState(0)
  const [defensepassavg, setDefensepassavg] = useState(0)
  const [assistavg, setAssistavg] = useState(0)
  const [posavg, setPosavg] = useState(0)
  const [attackassistavg, setAttackassistavg] = useState(0)
  const [interavg, setInteravg] = useState(0)
  const [tackleavg, setTackleavg] = useState(0)
  const [finavg, setFinavg] = useState(0)
  const [preavg, setPreavg] = useState(0)
  const [savesavg, setSavesavg] = useState(0)
  const [savespercentavg, setSavespercentavg] = useState(0)
  const [concededavg, setConcededavg] = useState(0)
  const [matchesratio, setMatchesratio] = useState(1)
  const [sacrificio, setSacrificio] = useState(0)

  const [t0, setT0] = useState(0)
  const [t1, setT1] = useState(0)
  const [t2, setT2] = useState(0)
  const [t3, setT3] = useState(0)
  const [t4, setT4] = useState(0)
  const [t5, setT5] = useState(0)
  const [t6, setT6] = useState(0)
  const [t0real, setT0real] = useState(true)
  const [t1real, setT1real] = useState(true)
  const [t2real, setT2real] = useState(true)
  const [t3real, setT3real] = useState(true)
  const [t4real, setT4real] = useState(true)
  const [t5real, setT5real] = useState(true)
  const [t6real, setT6real] = useState(true)
  const [maradei, setMaradei] = useState(0)
  const [master, setMaster] = useState(0)
  const [maradeireal, setMaradeireal] = useState(true)
  const [masterreal, setMasterreal] = useState(true)
  const [maradeiteam, setMaradeiteam] = useState(0)
  const [masterteam, setMasterteam] = useState(0)
  const [t0team, setT0team] = useState(0)
  const [t1team, setT1team] = useState(0)
  const [t2team, setT2team] = useState(0)
  const [t3team, setT3team] = useState(0)
  const [t4team, setT4team] = useState(0)
  const [t5team, setT5team] = useState(0)
  const [t6team, setT6team] = useState(0)
  const [banner, setBanner] = useState(0)
  const [fullteam, setFullteam] = useState(0)
  const [skill, setSkill] = useState(0)

  const [playerID, setPlayerID] = useState("STEAM_0:1:36779496")
  const [tID, setTID] = useState("all")

  const players = require("./players.json")

  const [actualovr, setActualovr] = useState("0")
  const [id, setId] = useState(0)

  const totaltime =
    secondsplayed / 60 / 90 > matches ? matches : secondsplayed / 60 / 90

  // declaramos las formulas de las variables que usaremos a lo largo del programa,
  // sus elementos cambian constantemente dependiendo el fetch que hagamos. por default es el fetch de todas las estadisticas

  const CP = (savesavg + savespercentavg + concededavg) / 3
  const CC = Math.round((passavg + assistavg + posavg) / 3)
  const AF = (finavg + preavg + attackassistavg) / 3
  const AD = (interavg + defensepassavg + sacrificio) / 3

  const val_def = (AD * 2.3 + AF / 2.5 + CC / 2) / 3
  const val_del = (AF * 2.3 + AD / 2.5 + CC / 2) / 3
  const val_mca = (CC + AF) / 2
  const val_mcd = (CC + AD) / 2
  const val_gk = CP

  // pendiende analizar si ovrT sigue teniendo un valor util, en todo caso borrarlo
  const ovr = getOverall(val_del, val_def, val_mca, val_mcd, CP)
  const pos = getPosition(val_del, val_def, val_mca, val_mcd, CP)

  const [state, setState] = useState({
    name: name,
    id: id,
    ovr: ovr,
    pos: pos,
    team: team,
    banner: banner,
  })

  const fetchUser = async () => {
    const apiCall = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/${tID}`
    )
    const apiCallA = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t1`
    )
    const apiCallB = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t2`
    )
    const apiCallC = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t3`
    )
    const apiCallD = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t4`
    )
    const apiCallE = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t5`
    )
    const apiCallJ = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t6`
    )
    const apiCallF = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t0`
    )
    const apiCallG = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/maradei`
    )
    const apiCallH = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/master`
    )
    const apiCallI = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/copaamerica`
    )
    const user = await apiCall.json()
    const userA = await apiCallA.json()
    const userB = await apiCallB.json()
    const userC = await apiCallC.json()
    const userD = await apiCallD.json()
    const userE = await apiCallE.json()
    const userF = await apiCallF.json()
    const userG = await apiCallG.json()
    const userH = await apiCallH.json()
    const userI = await apiCallI.json()
    const userJ = await apiCallJ.json()

    const totaltimet1 =
      userA[0] != undefined
        ? userA[0].secondsplayed / 60 / 90 > userA[0].matches
          ? userA[0].matches
          : userA[0].secondsplayed / 60 / 90
        : 0
    const totaltimet2 =
      userB[0] != undefined
        ? userB[0].secondsplayed / 60 / 90 > userB[0].matches
          ? userB[0].matches
          : userB[0].secondsplayed / 60 / 90
        : 0
    const totaltimet3 =
      userC[0] != undefined
        ? userC[0].secondsplayed / 60 / 90 > userC[0].matches
          ? userC[0].matches
          : userC[0].secondsplayed / 60 / 90
        : 0
    const totaltimet4 =
      userD[0] != undefined
        ? userD[0].secondsplayed / 60 / 90 > userD[0].matches
          ? userD[0].matches
          : userD[0].secondsplayed / 60 / 90
        : 0
    const totaltimet5 =
      userE[0] != undefined
        ? userE[0].secondsplayed / 60 / 90 > userE[0].matches
          ? userE[0].matches
          : userE[0].secondsplayed / 60 / 90
        : 0
    const totaltimet6 =
      userJ[0] != undefined
        ? userJ[0].secondsplayed / 60 / 90 > userJ[0].matches
          ? userJ[0].matches
          : userJ[0].secondsplayed / 60 / 90
        : 0
    const totaltimet0 =
      userF[0] != undefined
        ? userF[0].secondsplayed / 60 / 90 > userF[0].matches
          ? userF[0].matches
          : userF[0].secondsplayed / 60 / 90
        : 0
    const totaltimemaradei =
      userG[0] != undefined
        ? userG[0].secondsplayed / 60 / 90 > userG[0].matches
          ? userG[0].matches
          : userG[0].secondsplayed / 60 / 90
        : 0
    const totaltimemaster =
      userH[0] != undefined
        ? userH[0].secondsplayed / 60 / 90 > userH[0].matches
          ? userH[0].matches
          : userH[0].secondsplayed / 60 / 90
        : 0
    const totaltimeamerica =
      userI[0] != undefined
        ? userI[0].secondsplayed / 60 / 90 > userI[0].matches
          ? userI[0].matches
          : userI[0].secondsplayed / 60 / 90
        : 0
    const actualtime =
      tID == "all"
        ? Math.round(
            totaltimet1 +
              totaltimet2 +
              totaltimet3 +
              totaltimet4 +
              totaltimet5 +
              totaltimet0 +
              totaltimet6
          )
        : tID == "t1"
        ? totaltimet1
        : tID == "t2"
        ? totaltimet2
        : tID == "t3"
        ? totaltimet3
        : tID == "t4"
        ? totaltimet4
        : tID == "t5"
        ? totaltimet5
        : tID == "t6"
        ? totaltimet6
        : tID == "maradei"
        ? totaltimemaradei
        : tID == "master"
        ? totaltimemaster
        : tID == "copaamerica"
        ? totaltimeamerica
        : totaltimet0

    // call setName below to change the state 'name'
    // fetch inicial, por default agarra la playerID mia y la temporada es la de "all"
    setName(user[0].name)
    setTeam(getTeam(user[0].team))
    setFullteam(user[0].team)
    setBanner(getBanner(user[0].team))
    setMatches(user[0].matches)
    setGoals(user[0].goals)
    setAssists(user[0].assists)
    setShots(user[0].shots)
    setShotsontarget(user[0].shotsontarget)
    setPasses(user[0].passes)
    setPassescompleted(user[0].passescompleted)
    setInterceptions(user[0].interceptions)
    setFouls(user[0].fouls)
    setOffsides(user[0].offsides)
    setTackles(user[0].tackles)
    setTacklescompleted(user[0].tacklescompleted)
    setPossession(user[0].possession)
    setSaves(user[0].saves)
    setSavescaught(user[0].savescaught)
    setGoalsconceded(user[0].goalsconceded)
    setSecondsplayed(user[0].secondsplayed)
    setMatchesratio(actualtime / user[0].matches)
    setDistance(user[0].distancecovered)

    setId(steamid_to_64bit(playerID))
    document.title = user[0].name
    //const actualtime = user[0].secondsplayed/60/90 > user[0].matches ? user[0].matches : user[0].secondsplayed/60/90;
    const PASS = Math.round((user[0].passescompleted / actualtime) * 5)
    const DEFPASS = Math.round(doSomethingWithInput(PASS))
    const ASISS = Math.round((user[0].assists / actualtime) * 140)
    const TACKLE = Math.round(
      (user[0].tacklescompleted / user[0].tackles) * 100 * 4.5
    )
    const POSS = Math.round(
      (user[0].possession / (actualtime / user[0].matches)) * 7.76
    )
    const INTER = Math.round(
      ((user[0].interceptions / actualtime) * 2.5 +
        user[0].tacklescompleted / actualtime) *
        2.05
    )
    const FIN = Math.round((user[0].goals / actualtime) * 70)
    const PRE = Math.round((user[0].shotsontarget / user[0].shots) * 100)
    const ATASISS = Math.round(doSomethingWithInput(ASISS))
    const SAVE = Math.round((user[0].saves / actualtime) * 11)
    const SAVEPERCENT = Math.round((user[0].savescaught / user[0].saves) * 110)
    let SAVES = user[0].saves
    let CONCEDE = user[0].goalsconceded
    if (SAVES == 0) {
      SAVES = 1
    }
    if (CONCEDE == 0) {
      CONCEDE = 1
    }
    //const CONCEDED = Math.abs(((user[0].goalsconceded-user[0].saves)/SAVES*100)*1.5);
    const CONCEDED = Math.abs((1 - CONCEDE / SAVES) * 130)

    const SACRIFICIO = Math.abs(
      (user[0].distancecovered *
        (100 - user[0].possession / (actualtime / user[0].matches))) /
        7000
    )

    setFinavg(Math.round(doSomethingWithInput(FIN)))
    setPassavg(Math.round(doSomethingWithInput(PASS)))
    setDefensepassavg(Math.round(doSomethingWithInput(DEFPASS)))
    setAssistavg(Math.round(doSomethingWithInput(ASISS)))
    setInteravg(Math.round(doSomethingWithInput(INTER)))
    setPosavg(Math.round(doSomethingWithInput(POSS)))
    setAttackassistavg(Math.round(doSomethingWithInput(ATASISS)))
    setPreavg(Math.round(doSomethingWithInput(PRE)))
    setSavesavg(Math.round(doSomethingWithInput(SAVE)))
    setSavespercentavg(Math.round(doSomethingWithInput(SAVEPERCENT)))
    setConcededavg(Math.round(doSomethingWithInput(CONCEDED)))
    setSacrificio(Math.round(doSomethingWithInput(SACRIFICIO)))

    const ATTACKASISS = Math.round(doSomethingWithInput(ASISS))

    let PASS2 = Math.round(doSomethingWithInput(PASS))
    let DEFPASS2 = Math.round(doSomethingWithInput(PASS))
    let ASISS2 = Math.round(doSomethingWithInput(ASISS))
    let INTER2 = Math.round(doSomethingWithInput(INTER))
    let POSS2 = Math.round(doSomethingWithInput(POSS))
    let ATTACKASISS2 = Math.round(doSomethingWithInput(ATTACKASISS))
    let FIN2 = Math.round(doSomethingWithInput(FIN))
    let PRE2 = Math.round(doSomethingWithInput(PRE))
    let SAVE2 = Math.round(doSomethingWithInput(SAVE))
    let SAVEPERCENT2 = Math.round(doSomethingWithInput(SAVEPERCENT))
    let CONCEDED2 = Math.round(doSomethingWithInput(CONCEDED))
    let SACRIFICIO2 = Math.round(doSomethingWithInput(SACRIFICIO))

    const AFT1 = (FIN2 + PRE2 + ATTACKASISS2) / 3
    const ADT1 = (INTER2 + DEFPASS2 + SACRIFICIO2) / 3
    //const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
    const CCT1 = (PASS2 + ASISS2 + POSS2) / 3
    const CPT1 = (SAVE2 + SAVEPERCENT2 + CONCEDED2) / 3
    const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
    const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
    const val_mcat1 = (CCT1 + AFT1) / 2
    const val_mcdt1 = (CCT1 + ADT1) / 2
    const val_gkt1 = CPT1
    const ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
    const pos = getPosition(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
    console.log("OVERALL -> El AF: " + AFT1 + "/ AD / CC / CP ")

    setState({
      name: user[0].name,
      id: steamid_to_64bit(playerID),
      tID: tID,
      playerID: playerID,
      ovr: ovrt1,
      pos: pos,
      team: getTeam(user[0].team),
      banner: getBanner(user[0].team),
    })

    var theskill = players.players.map((player) => {
      if (player.skill1 && player.steam === playerID) {
        return player.skill1
      }
    })
    var theskill2 = theskill.toString().split(",").join("")
    console.log("La skill es: " + theskill2)
  }

  const fetcht1 = async () => {
    const apiCallt1 = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t1`
    )
    const usert1 = await apiCallt1.json()
    //call setName below to change the state 'name'
    //fetch para obtener los stats de la temporada / copa especificada
    if (usert1[0] && usert1[0].matches >= 1) {
      const totaltime =
        usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
          ? usert1[0].matches
          : usert1[0].secondsplayed / 60 / 90
      let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
      let DEFPASS = Math.round(doSomethingWithInput(PASS))
      let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
      let TACKLE = Math.round(
        (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
      )
      let MATCHESRATIO = totaltime / usert1[0].matches
      let POSS = Math.round(
        (usert1[0].possession / (totaltime / usert1[0].matches)) * 7.76
      )
      let INTER = Math.round(
        ((usert1[0].interceptions / totaltime) * 2.5 +
          usert1[0].tacklescompleted / totaltime) *
          2.05
      )
      let ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      let FIN = Math.round((usert1[0].goals / totaltime) * 70)
      let PRE = Math.round((usert1[0].shotsontarget / usert1[0].shots) * 100)
      let ATASISS = Math.round(doSomethingWithInput(ASISS))
      let SAVE = Math.round((usert1[0].saves / totaltime) * 11)
      let SAVEPERCENT = Math.round(
        (usert1[0].savescaught / usert1[0].saves) * 110
      )
      let SAVES = usert1[0].saves
      let CONCEDE = usert1[0].goalsconceded
      if (SAVES == 0) {
        SAVES = 1
      }
      if (CONCEDE == 0) {
        CONCEDE = 1
      }
      let CONCEDED = Math.abs((1 - CONCEDE / SAVES) * 130)
      let SACRIFICIO = Math.abs(
        (usert1[0].distancecovered *
          (100 - usert1[0].possession / (totaltime / usert1[0].matches))) /
          7000
      )

      PASS = Math.round(doSomethingWithInput(PASS))
      DEFPASS = Math.round(doSomethingWithInput(PASS))
      ASISS = Math.round(doSomethingWithInput(ASISS))
      INTER = Math.round(doSomethingWithInput(INTER))
      POSS = Math.round(doSomethingWithInput(POSS))
      ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      FIN = Math.round(doSomethingWithInput(FIN))
      PRE = Math.round(doSomethingWithInput(PRE))
      SAVE = Math.round(doSomethingWithInput(SAVE))
      SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))
      CONCEDED = Math.round(doSomethingWithInput(CONCEDED))
      SACRIFICIO = Math.round(doSomethingWithInput(SACRIFICIO))

      const AFT1 = (FIN + PRE + ATTACKASISS) / 3
      const ADT1 = (INTER + DEFPASS + SACRIFICIO) / 3
      //const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
      const CCT1 = (PASS + ASISS + POSS) / 3
      const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
      const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
      const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
      const val_mcat1 = (CCT1 + AFT1) / 2
      const val_mcdt1 = (CCT1 + ADT1) / 2
      const val_gkt1 = CPT1
      let ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
      let pos
      setT1(ovrt1)
      setT1team(getTeam(usert1[0].team))
      setT1real(true)
    } else {
      setT1real(false)
    }
  }

  const fetcht2 = async () => {
    const apiCallt1 = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t2`
    )
    const usert1 = await apiCallt1.json()
    //call setName below to change the state 'name'
    //fetch para obtener los stats de la temporada / copa especificada
    if (usert1[0] && usert1[0].matches >= 1) {
      const totaltime =
        usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
          ? usert1[0].matches
          : usert1[0].secondsplayed / 60 / 90

      let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
      let DEFPASS = Math.round(doSomethingWithInput(PASS))
      let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
      let TACKLE = Math.round(
        (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
      )
      let MATCHESRATIO = totaltime / usert1[0].matches
      let POSS = Math.round((usert1[0].possession / MATCHESRATIO) * 8)
      let INTER = Math.round(
        ((usert1[0].interceptions / totaltime) * 2.5 +
          usert1[0].tacklescompleted / totaltime) *
          2.05
      )
      let ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      let FIN = Math.round((usert1[0].goals / totaltime) * 70)
      let PRE = Math.round((usert1[0].shotsontarget / usert1[0].shots) * 100)
      let ATASISS = Math.round(doSomethingWithInput(ASISS))
      let SAVE = Math.round((usert1[0].saves / totaltime) * 11)
      let SAVEPERCENT = Math.round(
        (usert1[0].savescaught / usert1[0].saves) * 110
      )
      let SAVES = usert1[0].saves
      let CONCEDE = usert1[0].goalsconceded
      if (SAVES == 0) {
        SAVES = 1
      }
      if (CONCEDE == 0) {
        CONCEDE = 1
      }
      let CONCEDED = Math.abs((1 - CONCEDE / SAVES) * 130)
      let SACRIFICIO = Math.abs(
        (usert1[0].distancecovered *
          (100 - usert1[0].possession / (totaltime / usert1[0].matches))) /
          7000
      )

      PASS = Math.round(doSomethingWithInput(PASS))
      DEFPASS = Math.round(doSomethingWithInput(PASS))
      ASISS = Math.round(doSomethingWithInput(ASISS))
      INTER = Math.round(doSomethingWithInput(INTER))
      POSS = Math.round(doSomethingWithInput(POSS))
      ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      FIN = Math.round(doSomethingWithInput(FIN))
      PRE = Math.round(doSomethingWithInput(PRE))
      SAVE = Math.round(doSomethingWithInput(SAVE))
      SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))
      CONCEDED = Math.round(doSomethingWithInput(CONCEDED))
      SACRIFICIO = Math.round(doSomethingWithInput(SACRIFICIO))

      const AFT1 = (FIN + PRE + ATTACKASISS) / 3
      const ADT1 = (INTER + DEFPASS + SACRIFICIO) / 3
      //const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
      const CCT1 = (PASS + ASISS + POSS) / 3
      const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
      const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
      const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
      const val_mcat1 = (CCT1 + AFT1) / 2
      const val_mcdt1 = (CCT1 + ADT1) / 2
      const val_gkt1 = CPT1
      let ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
      let pos
      setT2(ovrt1)
      setT2team(getTeam(usert1[0].team))
      setT2real(true)
    } else {
      setT2real(false)
    }
  }

  const fetcht3 = async () => {
    const apiCallt1 = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t3`
    )
    const usert1 = await apiCallt1.json()
    //call setName below to change the state 'name'
    //fetch para obtener los stats de la temporada / copa especificada
    if (usert1[0] && usert1[0].matches >= 1) {
      const totaltime =
        usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
          ? usert1[0].matches
          : usert1[0].secondsplayed / 60 / 90

      let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
      let DEFPASS = Math.round(doSomethingWithInput(PASS))
      let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
      let TACKLE = Math.round(
        (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
      )
      let MATCHESRATIO = totaltime / usert1[0].matches
      let POSS = Math.round((usert1[0].possession / MATCHESRATIO) * 8)
      let INTER = Math.round(
        ((usert1[0].interceptions / totaltime) * 2.5 +
          usert1[0].tacklescompleted / totaltime) *
          2.05
      )
      let ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      let FIN = Math.round((usert1[0].goals / totaltime) * 70)
      let PRE = Math.round((usert1[0].shotsontarget / usert1[0].shots) * 100)
      let ATASISS = Math.round(doSomethingWithInput(ASISS))
      let SAVE = Math.round((usert1[0].saves / totaltime) * 11)
      let SAVEPERCENT = Math.round(
        (usert1[0].savescaught / usert1[0].saves) * 110
      )
      let SAVES = usert1[0].saves
      let CONCEDE = usert1[0].goalsconceded
      if (SAVES == 0) {
        SAVES = 1
      }
      if (CONCEDE == 0) {
        CONCEDE = 1
      }
      let CONCEDED = Math.abs((1 - CONCEDE / SAVES) * 130)
      let SACRIFICIO = Math.abs(
        (usert1[0].distancecovered *
          (100 - usert1[0].possession / (totaltime / usert1[0].matches))) /
          7000
      )

      PASS = Math.round(doSomethingWithInput(PASS))
      DEFPASS = Math.round(doSomethingWithInput(PASS))
      ASISS = Math.round(doSomethingWithInput(ASISS))
      INTER = Math.round(doSomethingWithInput(INTER))
      POSS = Math.round(doSomethingWithInput(POSS))
      ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      FIN = Math.round(doSomethingWithInput(FIN))
      PRE = Math.round(doSomethingWithInput(PRE))
      SAVE = Math.round(doSomethingWithInput(SAVE))
      SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))
      CONCEDED = Math.round(doSomethingWithInput(CONCEDED))
      SACRIFICIO = Math.round(doSomethingWithInput(SACRIFICIO))

      const AFT1 = (FIN + PRE + ATTACKASISS) / 3
      const ADT1 = (INTER + DEFPASS + SACRIFICIO) / 3
      // const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
      const CCT1 = (PASS + ASISS + POSS) / 3
      const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
      const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
      const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
      const val_mcat1 = (CCT1 + AFT1) / 2
      const val_mcdt1 = (CCT1 + ADT1) / 2
      const val_gkt1 = CPT1
      let ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
      let pos
      setT3(ovrt1)
      setT3team(getTeam(usert1[0].team))
      setT3real(true)
    } else {
      setT3real(false)
    }
  }

  const fetcht4 = async () => {
    const apiCallt1 = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t4`
    )
    const usert1 = await apiCallt1.json()
    //call setName below to change the state 'name'
    //fetch para obtener los stats de la temporada / copa especificada
    if (usert1[0] && usert1[0].matches >= 1) {
      const totaltime =
        usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
          ? usert1[0].matches
          : usert1[0].secondsplayed / 60 / 90

      let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
      let DEFPASS = Math.round(doSomethingWithInput(PASS))
      let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
      let TACKLE = Math.round(
        (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
      )
      let MATCHESRATIO = totaltime / usert1[0].matches
      let POSS = Math.round((usert1[0].possession / MATCHESRATIO) * 8)
      let INTER = Math.round(
        ((usert1[0].interceptions / totaltime) * 2.5 +
          usert1[0].tacklescompleted / totaltime) *
          2.05
      )
      let ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      let FIN = Math.round((usert1[0].goals / totaltime) * 70)
      let PRE = Math.round((usert1[0].shotsontarget / usert1[0].shots) * 100)
      const ATASISS = Math.round(doSomethingWithInput(ASISS))
      let SAVE = Math.round((usert1[0].saves / totaltime) * 11)
      let SAVEPERCENT = Math.round(
        (usert1[0].savescaught / usert1[0].saves) * 110
      )
      let SAVES = usert1[0].saves
      let CONCEDE = usert1[0].goalsconceded
      if (SAVES == 0) {
        SAVES = 1
      }
      if (CONCEDE == 0) {
        CONCEDE = 1
      }
      let CONCEDED = Math.abs((1 - CONCEDE / SAVES) * 130)

      PASS = Math.round(doSomethingWithInput(PASS))
      DEFPASS = Math.round(doSomethingWithInput(PASS))
      ASISS = Math.round(doSomethingWithInput(ASISS))
      INTER = Math.round(doSomethingWithInput(INTER))
      POSS = Math.round(doSomethingWithInput(POSS * 0.97))
      ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      FIN = Math.round(doSomethingWithInput(FIN))
      PRE = Math.round(doSomethingWithInput(PRE))
      SAVE = Math.round(doSomethingWithInput(SAVE))
      SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))

      const AFT1 = (FIN + PRE + ATTACKASISS) / 3
      const ADT1 = (INTER + DEFPASS) / 2
      //const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
      const CCT1 = (PASS + ASISS + POSS) / 3
      const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
      const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
      const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
      const val_mcat1 = (CCT1 + AFT1) / 2
      const val_mcdt1 = (CCT1 + ADT1) / 2
      const val_gkt1 = CPT1
      let ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
      let pos
      setT4(ovrt1)
      setT4team(getTeam(usert1[0].team))
      setActualovr(ovrt1)
      setT4real(true)
    } else {
      setT4real(false)
    }
  }

  const fetcht5 = async () => {
    const apiCallt1 = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t5`
    )
    const usert1 = await apiCallt1.json()
    //call setName below to change the state 'name'
    //fetch para obtener los stats de la temporada / copa especificada
    if (usert1[0] && usert1[0].matches >= 1) {
      const totaltime =
        usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
          ? usert1[0].matches
          : usert1[0].secondsplayed / 60 / 90

      let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
      let DEFPASS = Math.round(doSomethingWithInput(PASS))
      let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
      let TACKLE = Math.round(
        (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
      )
      let MATCHESRATIO = totaltime / usert1[0].matches
      let POSS = Math.round((usert1[0].possession / MATCHESRATIO) * 7.76)
      let INTER = Math.round(
        ((usert1[0].interceptions / totaltime) * 2.5 +
          usert1[0].tacklescompleted / totaltime) *
          2.05
      )
      let ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      let FIN = Math.round((usert1[0].goals / totaltime) * 70)
      let PRE = Math.round((usert1[0].shotsontarget / usert1[0].shots) * 100)
      let ATASISS = Math.round(doSomethingWithInput(ASISS))
      let SAVE = Math.round((usert1[0].saves / totaltime) * 11)
      let SAVEPERCENT = Math.round(
        (usert1[0].savescaught / usert1[0].saves) * 110
      )
      let SAVES = usert1[0].saves
      if (SAVES == 0) {
        SAVES = 1
      }
      let CONCEDED = Math.abs((1 - usert1[0].goalsconceded / SAVES) * 130)
      let SACRIFICIO = Math.abs(
        (usert1[0].distancecovered *
          (100 - usert1[0].possession / (totaltime / usert1[0].matches))) /
          7000
      )

      PASS = Math.round(doSomethingWithInput(PASS))
      DEFPASS = Math.round(doSomethingWithInput(PASS))
      ASISS = Math.round(doSomethingWithInput(ASISS))
      INTER = Math.round(doSomethingWithInput(INTER))
      POSS = Math.round(doSomethingWithInput(POSS))
      ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      FIN = Math.round(doSomethingWithInput(FIN))
      PRE = Math.round(doSomethingWithInput(PRE))
      SAVE = Math.round(doSomethingWithInput(SAVE))
      SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))
      CONCEDED = Math.round(doSomethingWithInput(CONCEDED))
      SACRIFICIO = Math.round(doSomethingWithInput(SACRIFICIO))

      const AFT1 = (FIN + PRE + ATTACKASISS) / 3
      const ADT1 = (INTER + DEFPASS + SACRIFICIO) / 3
      //const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
      const CCT1 = (PASS + ASISS + POSS) / 3
      const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
      const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
      const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
      const val_mcat1 = (CCT1 + AFT1) / 2
      const val_mcdt1 = (CCT1 + ADT1) / 2
      const val_gkt1 = CPT1
      let ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
      let pos
      setT5(ovrt1)
      setT5team(getTeam(usert1[0].team))
      setActualovr(ovrt1)
      setT5real(true)
    } else {
      setT5real(false)
    }
  }

  const fetcht0 = async () => {
    const apiCallt1 = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t0`
    )
    const usert1 = await apiCallt1.json()
    //call setName below to change the state 'name'
    //fetch para obtener los stats de la temporada / copa especificada
    if (usert1[0] && usert1[0].matches >= 1) {
      const totaltime =
        usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
          ? usert1[0].matches
          : usert1[0].secondsplayed / 60 / 90
      let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
      let DEFPASS = Math.round(doSomethingWithInput(PASS))
      let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
      let TACKLE = Math.round(
        (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
      )
      let MATCHESRATIO = totaltime / usert1[0].matches
      let POSS = Math.round(
        (usert1[0].possession / (totaltime / usert1[0].matches)) * 7.76
      )
      let INTER = Math.round(
        ((usert1[0].interceptions / totaltime) * 2.5 +
          usert1[0].tacklescompleted / totaltime) *
          2.05
      )
      let ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      let FIN = Math.round((usert1[0].goals / totaltime) * 70)
      let PRE = Math.round((usert1[0].shotsontarget / usert1[0].shots) * 100)
      let ATASISS = Math.round(doSomethingWithInput(ASISS))
      let SAVE = Math.round((usert1[0].saves / totaltime) * 11)
      let SAVEPERCENT = Math.round(
        (usert1[0].savescaught / usert1[0].saves) * 110
      )
      let SAVES = usert1[0].saves
      let CONCEDE = usert1[0].goalsconceded
      if (SAVES == 0) {
        SAVES = 1
      }
      if (CONCEDE == 0) {
        CONCEDE = 1
      }
      let CONCEDED = Math.abs((1 - CONCEDE / SAVES) * 130)
      let SACRIFICIO = Math.abs(
        (usert1[0].distancecovered *
          (100 - usert1[0].possession / (totaltime / usert1[0].matches))) /
          7000
      )

      PASS = Math.round(doSomethingWithInput(PASS))
      DEFPASS = Math.round(doSomethingWithInput(PASS))
      ASISS = Math.round(doSomethingWithInput(ASISS))
      INTER = Math.round(doSomethingWithInput(INTER))
      POSS = Math.round(doSomethingWithInput(POSS))
      ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      FIN = Math.round(doSomethingWithInput(FIN))
      PRE = Math.round(doSomethingWithInput(PRE))
      SAVE = Math.round(doSomethingWithInput(SAVE))
      SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))
      CONCEDED = Math.round(doSomethingWithInput(CONCEDED))
      SACRIFICIO = Math.round(doSomethingWithInput(SACRIFICIO))

      const AFT1 = (FIN + PRE + ATTACKASISS) / 3
      const ADT1 = (INTER + DEFPASS + SACRIFICIO) / 3
      //const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
      const CCT1 = (PASS + ASISS + POSS) / 3
      const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
      const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
      const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
      const val_mcat1 = (CCT1 + AFT1) / 2
      const val_mcdt1 = (CCT1 + ADT1) / 2
      const val_gkt1 = CPT1
      let ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
      let pos
      setT0(ovrt1)
      setT0team(getTeam(usert1[0].team))
      setT0real(true)
    } else {
      setT0real(false)
    }
  }

  const fetcht6 = async () => {
    const apiCallt1 = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/t6`
    )
    const usert1 = await apiCallt1.json()
    //call setName below to change the state 'name'
    //fetch para obtener los stats de la temporada / copa especificada
    if (usert1[0] && usert1[0].matches >= 1) {
      const totaltime =
        usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
          ? usert1[0].matches
          : usert1[0].secondsplayed / 60 / 90

      let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
      let DEFPASS = Math.round(doSomethingWithInput(PASS))
      let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
      let TACKLE = Math.round(
        (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
      )
      let MATCHESRATIO = totaltime / usert1[0].matches
      let POSS = Math.round((usert1[0].possession / MATCHESRATIO) * 8)
      let INTER = Math.round(
        ((usert1[0].interceptions / totaltime) * 2.5 +
          usert1[0].tacklescompleted / totaltime) *
          2.05
      )
      let ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      let FIN = Math.round((usert1[0].goals / totaltime) * 70)
      let PRE = Math.round((usert1[0].shotsontarget / usert1[0].shots) * 100)
      let ATASISS = Math.round(doSomethingWithInput(ASISS))
      let SAVE = Math.round((usert1[0].saves / totaltime) * 11)
      let SAVEPERCENT = Math.round(
        (usert1[0].savescaught / usert1[0].saves) * 110
      )
      let SAVES = usert1[0].saves
      let CONCEDE = usert1[0].goalsconceded
      if (SAVES == 0) {
        SAVES = 1
      }
      if (CONCEDE == 0) {
        CONCEDE = 1
      }
      let CONCEDED = Math.abs((1 - CONCEDE / SAVES) * 130)
      let SACRIFICIO = Math.abs(
        (usert1[0].distancecovered *
          (100 - usert1[0].possession / (totaltime / usert1[0].matches))) /
          7000
      )

      PASS = Math.round(doSomethingWithInput(PASS))
      DEFPASS = Math.round(doSomethingWithInput(PASS))
      ASISS = Math.round(doSomethingWithInput(ASISS))
      INTER = Math.round(doSomethingWithInput(INTER))
      POSS = Math.round(doSomethingWithInput(POSS))
      ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      FIN = Math.round(doSomethingWithInput(FIN))
      PRE = Math.round(doSomethingWithInput(PRE))
      SAVE = Math.round(doSomethingWithInput(SAVE))
      SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))
      CONCEDED = Math.round(doSomethingWithInput(CONCEDED))
      SACRIFICIO = Math.round(doSomethingWithInput(SACRIFICIO))

      const AFT1 = (FIN + PRE + ATTACKASISS) / 3
      const ADT1 = (INTER + DEFPASS + SACRIFICIO) / 3
      //const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
      const CCT1 = (PASS + ASISS + POSS) / 3
      const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
      const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
      const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
      const val_mcat1 = (CCT1 + AFT1) / 2
      const val_mcdt1 = (CCT1 + ADT1) / 2
      const val_gkt1 = CPT1
      let ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
      let pos
      setT6(ovrt1)
      setT6team(getTeam(usert1[0].team))
      setT6real(true)
    } else {
      setT6real(false)
    }
  }

  const fetchmaradei = async () => {
    const apiCallt1 = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/maradei`
    )
    const usert1 = await apiCallt1.json()
    //call setName below to change the state 'name'
    //fetch para obtener los stats de la temporada / copa especificada
    if (usert1[0] && usert1[0].matches >= 1) {
      const totaltime =
        usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
          ? usert1[0].matches
          : usert1[0].secondsplayed / 60 / 90

      let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
      let DEFPASS = Math.round(doSomethingWithInput(PASS))
      let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
      let TACKLE = Math.round(
        (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
      )
      let MATCHESRATIO = totaltime / usert1[0].matches
      let POSS = Math.round((usert1[0].possession / MATCHESRATIO) * 8)
      let INTER = Math.round(
        ((usert1[0].interceptions / totaltime) * 2.5 +
          usert1[0].tacklescompleted / totaltime) *
          2.05
      )
      let ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      let FIN = Math.round((usert1[0].goals / totaltime) * 70)
      let PRE = Math.round((usert1[0].shotsontarget / usert1[0].shots) * 100)
      let ATASISS = Math.round(doSomethingWithInput(ASISS))
      let SAVE = Math.round((usert1[0].saves / totaltime) * 11)
      let SAVEPERCENT = Math.round(
        (usert1[0].savescaught / usert1[0].saves) * 110
      )
      let SAVES = usert1[0].saves
      let CONCEDE = usert1[0].goalsconceded
      if (SAVES == 0) {
        SAVES = 1
      }
      if (CONCEDE == 0) {
        CONCEDE = 1
      }
      let CONCEDED = Math.abs((1 - CONCEDE / SAVES) * 130)
      let SACRIFICIO = Math.abs(
        (usert1[0].distancecovered *
          (100 - usert1[0].possession / (totaltime / usert1[0].matches))) /
          7000
      )

      PASS = Math.round(doSomethingWithInput(PASS))
      DEFPASS = Math.round(doSomethingWithInput(PASS))
      ASISS = Math.round(doSomethingWithInput(ASISS))
      INTER = Math.round(doSomethingWithInput(INTER))
      POSS = Math.round(doSomethingWithInput(POSS))
      ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      FIN = Math.round(doSomethingWithInput(FIN))
      PRE = Math.round(doSomethingWithInput(PRE))
      SAVE = Math.round(doSomethingWithInput(SAVE))
      SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))
      CONCEDED = Math.round(doSomethingWithInput(CONCEDED))
      SACRIFICIO = Math.round(doSomethingWithInput(SACRIFICIO))

      const AFT1 = (FIN + PRE + ATTACKASISS) / 3
      const ADT1 = (INTER + DEFPASS + SACRIFICIO) / 3
      //const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
      const CCT1 = (PASS + ASISS + POSS) / 3
      const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
      const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
      const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
      const val_mcat1 = (CCT1 + AFT1) / 2
      const val_mcdt1 = (CCT1 + ADT1) / 2
      const val_gkt1 = CPT1
      let ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
      let pos
      setMaradei(ovrt1)
      setMaradeiteam(getTeam(usert1[0].team))
      setMaradeireal(true)
    } else {
      setMaradeireal(false)
    }
  }

  const fetchmaster = async () => {
    const apiCallt1 = await fetch(
      `https://stats.iosoccer-sa.bid/api/player/${playerID}/master`
    )
    const usert1 = await apiCallt1.json()
    //call setName below to change the state 'name'
    //fetch para obtener los stats de la temporada / copa especificada
    if (usert1[0] && usert1[0].matches >= 1) {
      const totaltime =
        usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
          ? usert1[0].matches
          : usert1[0].secondsplayed / 60 / 90

      let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
      let DEFPASS = Math.round(doSomethingWithInput(PASS))
      let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
      let TACKLE = Math.round(
        (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
      )
      let MATCHESRATIO = totaltime / usert1[0].matches
      let POSS = Math.round((usert1[0].possession / MATCHESRATIO) * 7.76)
      let INTER = Math.round(
        ((usert1[0].interceptions / totaltime) * 2.5 +
          usert1[0].tacklescompleted / totaltime) *
          2.05
      )
      let ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      let FIN = Math.round((usert1[0].goals / totaltime) * 70)
      let PRE = Math.round((usert1[0].shotsontarget / usert1[0].shots) * 100)
      let ATASISS = Math.round(doSomethingWithInput(ASISS))
      let SAVE = Math.round((usert1[0].saves / totaltime) * 11)
      let SAVEPERCENT = Math.round(
        (usert1[0].savescaught / usert1[0].saves) * 110
      )
      let SAVES = usert1[0].saves
      let CONCEDE = usert1[0].goalsconceded
      if (SAVES == 0) {
        SAVES = 1
      }
      if (CONCEDE == 0) {
        CONCEDE = 1
      }
      let CONCEDED = Math.abs((1 - CONCEDE / SAVES) * 130)
      CONCEDED = Math.round(doSomethingWithInput(CONCEDED))
      let SACRIFICIO = Math.abs(
        (usert1[0].distancecovered *
          (100 - usert1[0].possession / (totaltime / usert1[0].matches))) /
          7000
      )

      PASS = Math.round(doSomethingWithInput(PASS))
      DEFPASS = Math.round(doSomethingWithInput(PASS))
      ASISS = Math.round(doSomethingWithInput(ASISS))
      INTER = Math.round(doSomethingWithInput(INTER))
      POSS = Math.round(doSomethingWithInput(POSS))
      ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
      FIN = Math.round(doSomethingWithInput(FIN))
      PRE = Math.round(doSomethingWithInput(PRE))
      SAVE = Math.round(doSomethingWithInput(SAVE))
      SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))
      CONCEDED = Math.round(doSomethingWithInput(CONCEDED))
      SACRIFICIO = Math.round(doSomethingWithInput(SACRIFICIO))

      const AFT1 = (FIN + PRE + ATTACKASISS) / 3
      const ADT1 = (INTER + DEFPASS + SACRIFICIO) / 3
      //const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
      const CCT1 = (PASS + ASISS + POSS) / 3
      const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
      const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
      const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
      const val_mcat1 = (CCT1 + AFT1) / 2
      const val_mcdt1 = (CCT1 + ADT1) / 2
      const val_gkt1 = CPT1
      let ovrt1 = getOverall(val_delt1, val_deft1, val_mcat1, val_mcdt1, CPT1)
      let pos
      setMaster(ovrt1)
      setMasterteam(getTeam(usert1[0].team))
      setMasterreal(true)
    } else {
      setMasterreal(false)
    }
  }

  useEffect(() => {
    fetchUser()
    fetcht1()
    fetcht2()
    fetcht3()
    fetcht4()
    fetcht5()
    fetcht6()
    fetcht0()
    fetchmaradei()
    fetchmaster()
  }, [playerID])

  useEffect(() => {
    fetchUser()
    fetcht1()
    fetcht2()
    fetcht3()
    fetcht4()
    fetcht5()
    fetcht6()
    fetcht0()
    fetchmaradei()
    fetchmaster()
  }, [tID])

  const printPDF = () => {
    html2canvas(document.querySelector("#ThePlayerCard")).then(function (
      canvas9
    ) {
      var playerimage = canvas9.toDataURL("image/png")
      window.saveAs(playerimage, `${tID}_${playerID}.png`)
    })
  }

  return (
    <>
      <div className="content-container">
        <section>
          <div
            className="fw-container bg-dark"
            style={{
              backgroundImage: `url(/banners/${banner}.png)`,
            }}
          >
            <div className="container-large flex top-container">
              <TheCard {...state} />
              <div className="top-info">
                <h1 className="top-header">
                  <span
                    className="ovr stat_tier_3"
                    style={{
                      backgroundColor:
                        ovr >= 90
                          ? "#02fec5"
                          : ovr >= 80 && ovr < 90
                          ? "#a8fe02"
                          : ovr >= 70 && ovr < 80
                          ? "#fbb206"
                          : "red",
                    }}
                  >
                    {ovr}
                  </span>
                  <span>&nbsp;</span>
                  {name}
                </h1>
                <div>
                  <a className="namelink">
                    <span>{fullteam}</span>
                  </a>
                </div>
                <h2 className="subtle-text">
                  <span>
                    {name} IOSoccer {getSeason(tID)} Stats
                  </span>
                </h2>
                <p className="description subtle-text">
                  <span>
                    {name} es un futbolista con una media de {ovr} en la
                    posicion de {pos}. {name} es un jugador perteneciente al
                    equipo {fullteam} de IOSoccer.
                  </span>
                </p>
                <div>
                  <ul className="versions-list">
                    <div>
                      {t0real ? (
                        <button
                          className="abutton"
                          onClick={(r) => setTID(String("t0"))}
                        >
                          <li className="versions-list-el">
                            <span
                              className="stat stat_tier_2"
                              style={{
                                backgroundColor:
                                  t0 >= 90
                                    ? "#02fec5"
                                    : t0 >= 80 && t0 < 90
                                    ? "#a8fe02"
                                    : t0 >= 70 && t0 < 80
                                    ? "#fbb206"
                                    : "red",
                              }}
                            >
                              {t0}
                            </span>
                            <img
                              className="club-flag versions-list-flag"
                              src={"/clubs/" + `${t0team}` + ".png"}
                              title={t0team}
                            />
                            <span className="game">Temporada 0</span>
                          </li>
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {t1real ? (
                        <button
                          className="abutton"
                          onClick={(r) =>
                            setTID(String("t1")) && setActualovr(t1)
                          }
                        >
                          <li className="versions-list-el">
                            <span
                              className="stat stat_tier_2"
                              style={{
                                backgroundColor:
                                  t1 >= 90
                                    ? "#02fec5"
                                    : t1 >= 80 && t1 < 90
                                    ? "#a8fe02"
                                    : t1 >= 70 && t1 < 80
                                    ? "#fbb206"
                                    : "red",
                              }}
                            >
                              {t1}
                            </span>
                            <img
                              className="club-flag versions-list-flag"
                              src={"/clubs/" + `${t1team}` + ".png"}
                              title={t1team}
                            />
                            <span className="game">Temporada 1</span>
                          </li>
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {t2real ? (
                        <button
                          className="abutton"
                          onClick={(r) =>
                            setTID(String("t2")) && setActualovr(t2)
                          }
                        >
                          <li className="versions-list-el">
                            <span
                              className="stat stat_tier_2"
                              style={{
                                backgroundColor:
                                  t2 >= 90
                                    ? "#02fec5"
                                    : t2 >= 80 && t2 < 90
                                    ? "#a8fe02"
                                    : t2 >= 70 && t2 < 80
                                    ? "#fbb206"
                                    : "red",
                              }}
                            >
                              {t2}
                            </span>
                            <img
                              className="club-flag versions-list-flag"
                              src={"/clubs/" + `${t2team}` + ".png"}
                              title={t2team}
                            />
                            <span className="game">Temporada 2</span>
                          </li>
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {t3real ? (
                        <button
                          className="abutton"
                          onClick={(r) =>
                            setTID(String("t3")) && setActualovr(t3)
                          }
                        >
                          <li className="versions-list-el">
                            <span
                              className="stat stat_tier_2"
                              style={{
                                backgroundColor:
                                  t3 >= 90
                                    ? "#02fec5"
                                    : t3 >= 80 && t3 < 90
                                    ? "#a8fe02"
                                    : t3 >= 70 && t3 < 80
                                    ? "#fbb206"
                                    : "red",
                              }}
                            >
                              {t3}
                            </span>
                            <img
                              className="club-flag versions-list-flag"
                              src={"/clubs/" + `${t3team}` + ".png"}
                              title={t3team}
                            />
                            <span className="game">Temporada 3</span>
                          </li>
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {t4real ? (
                        <button
                          className="abutton"
                          onClick={(r) =>
                            setTID(String("t4")) && setActualovr(t4)
                          }
                        >
                          {" "}
                          <li className="versions-list-el">
                            {" "}
                            <span
                              className="stat stat_tier_2"
                              style={{
                                backgroundColor:
                                  t4 >= 90
                                    ? "#02fec5"
                                    : t4 >= 80 && t4 < 90
                                    ? "#a8fe02"
                                    : t4 >= 70 && t4 < 80
                                    ? "#fbb206"
                                    : "red",
                              }}
                            >
                              {t4}
                            </span>
                            <img
                              className="club-flag versions-list-flag"
                              src={"/clubs/" + `${t4team}` + ".png"}
                              title={t4team}
                            />
                            <span className="game">Temporada 4</span>{" "}
                          </li>{" "}
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {t5real ? (
                        <button
                          className="abutton"
                          onClick={(r) =>
                            setTID(String("t5")) && setActualovr(t5)
                          }
                        >
                          <li className="versions-list-el">
                            <span
                              className="stat stat_tier_2"
                              style={{
                                backgroundColor:
                                  t5 >= 90
                                    ? "#02fec5"
                                    : t5 >= 80 && t5 < 90
                                    ? "#a8fe02"
                                    : t5 >= 70 && t5 < 80
                                    ? "#fbb206"
                                    : "red",
                              }}
                            >
                              {t5}
                            </span>
                            <img
                              className="club-flag versions-list-flag"
                              src={"/clubs/" + `${t5team}` + ".png"}
                              title={t5team}
                            />
                            <span className="game">Temporada 5</span>
                          </li>
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {t6real ? (
                        <button
                          className="abutton"
                          onClick={(r) =>
                            setTID(String("t6")) && setActualovr(t6)
                          }
                        >
                          <li className="versions-list-el">
                            <span
                              className="stat stat_tier_2"
                              style={{
                                backgroundColor:
                                  t6 >= 90
                                    ? "#02fec5"
                                    : t6 >= 80 && t6 < 90
                                    ? "#a8fe02"
                                    : t6 >= 70 && t6 < 80
                                    ? "#fbb206"
                                    : "red",
                              }}
                            >
                              {t6}
                            </span>
                            <img
                              className="club-flag versions-list-flag"
                              src={"/clubs/" + `${t6team}` + ".png"}
                              title={t6team}
                            />
                            <span className="game">Temporada 6</span>
                          </li>
                        </button>
                      ) : null}
                    </div>
                    <div></div>
                    <div>
                      {maradeireal ? (
                        <button
                          className="abutton"
                          onClick={(r) => setTID(String("maradei"))}
                        >
                          <li className="versions-list-el">
                            <span
                              className="stat stat_tier_2"
                              style={{
                                backgroundColor:
                                  maradei >= 90
                                    ? "#02fec5"
                                    : maradei >= 80 && maradei < 90
                                    ? "#a8fe02"
                                    : maradei >= 70 && maradei < 80
                                    ? "#fbb206"
                                    : "red",
                              }}
                            >
                              {maradei}
                            </span>
                            <img
                              className="club-flag versions-list-flag"
                              src={"/clubs/" + `${maradeiteam}` + ".png"}
                              title={maradeiteam}
                            />
                            <span className="game">Copa Maradei</span>
                          </li>
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {masterreal ? (
                        <button
                          className="abutton"
                          onClick={(r) => setTID(String("master"))}
                        >
                          <li className="versions-list-el">
                            <span
                              className="stat stat_tier_2"
                              style={{
                                backgroundColor:
                                  master >= 90
                                    ? "#02fec5"
                                    : master >= 80 && master < 90
                                    ? "#a8fe02"
                                    : master >= 70 && master < 80
                                    ? "#fbb206"
                                    : "red",
                              }}
                            >
                              {master}
                            </span>
                            <img
                              className="club-flag versions-list-flag"
                              src={"/clubs/" + `${masterteam}` + ".png"}
                              title={masterteam}
                            />
                            <span className="game">Copa Master</span>
                          </li>
                        </button>
                      ) : null}
                    </div>
                    <li className="versions-list-el">
                      <button
                        className="abutton"
                        onClick={(r) => setTID(String("all"))}
                      >
                        <span className="game">Mostrar todo</span>
                      </button>
                    </li>
                  </ul>
                  <div>
                    <select
                      className="custom-select"
                      value={playerID}
                      onChange={(e) => {
                        setTID(String("all"))
                        setPlayerID(String(e.target.value))
                      }}
                    >
                      {players.players.map((player) => (
                        <option key={player.steam} value={player.steam}>
                          {player.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="main-stats-cards-container container-large flex flex-expand"
          style={{ height: "auto !important" }}
        >
          <div
            className="player-main-column player-info-column"
            style={{ flexGrow: 1 }}
          >
            <div className="hexagon-positions-container">
              <div className="hexagon-container">
                <RadarChart
                  captions={{
                    // columns
                    battery: "AP",
                    design: "AD",
                    poderio: "CP",
                    useful: "CC",
                  }}
                  data={[
                    // data
                    {
                      data: {
                        battery: AF / 100,
                        design: AD / 100,
                        useful: CC / 100,
                        poderio: CP / 100,
                      },
                      meta: { color: "#58FCEC" },
                    },
                  ]}
                  size={200}
                />
              </div>
              <div className="player-positions-new">
                <div className="player-positions-row">
                  <div
                    className="player-positions-item fw-2"
                    style={{
                      backgroundColor:
                        val_del >= 85
                          ? "#ef1e1e"
                          : val_del >= 75 && val_del < 85
                          ? "#f09090"
                          : "white",
                      border:
                        Math.trunc(val_del) == ovr ? "2px solid #000" : null,
                    }}
                  >
                    <span className="pos">CF</span>
                    <span
                      className="stat ovr_12 stat_tier_3"
                      style={{
                        backgroundColor: "rgba(250, 250, 250, 0.2)",
                      }}
                    >
                      {Math.trunc(val_del)}
                    </span>
                  </div>
                </div>
                <div className="player-positions-row">
                  <div
                    className="player-positions-item"
                    style={{
                      backgroundColor:
                        val_mca >= 85
                          ? "#88c900"
                          : val_mca >= 75 && val_mca < 85
                          ? "#b6c98d"
                          : "white",
                      border:
                        Math.trunc(val_mca) == ovr ? "2px solid #000" : null,
                    }}
                  >
                    <span className="pos">MCA</span>
                    <span
                      className="stat ovr_12 stat_tier_3"
                      style={{
                        backgroundColor: "rgba(250, 250, 250, 0.2)",
                      }}
                    >
                      {Math.trunc(val_mca)}
                    </span>
                  </div>
                  <div
                    className="player-positions-item"
                    style={{
                      backgroundColor:
                        val_mcd >= 85
                          ? "#88c900"
                          : val_mcd >= 75 && val_mcd < 85
                          ? "#b6c98d"
                          : "white",
                      border:
                        Math.trunc(val_mcd) == ovr ? "2px solid #000" : null,
                    }}
                  >
                    <span className="pos">MCD</span>
                    <span
                      className="stat ovr_12 stat_tier_3"
                      style={{
                        backgroundColor: "rgba(250, 250, 250, 0.2)",
                      }}
                    >
                      {Math.trunc(val_mcd)}
                    </span>
                  </div>
                </div>
                <div className="player-positions-row">
                  <div
                    className="player-positions-item fw-2"
                    style={{
                      backgroundColor:
                        val_def >= 85
                          ? "#00abd2"
                          : val_def >= 75 && val_def < 85
                          ? "#92c6d1"
                          : "white",
                      border:
                        Math.trunc(val_def) == ovr ? "2px solid #000" : null,
                    }}
                  >
                    <span className="pos">CB</span>
                    <span
                      className="stat ovr_12 stat_tier_3"
                      style={{
                        backgroundColor: "rgba(250, 250, 250, 0.2)",
                      }}
                    >
                      {Math.trunc(val_def)}
                    </span>
                  </div>
                </div>
                <div className="player-positions-row">
                  <div
                    className="player-positions-item fw-2"
                    style={{
                      backgroundColor:
                        val_gk >= 85
                          ? "#feb907"
                          : val_gk >= 75 && val_gk < 85
                          ? "#fed97b"
                          : "white",
                      border:
                        Math.trunc(val_gk) == ovr ? "2px solid #000" : null,
                    }}
                  >
                    <span className="pos">GK</span>
                    <span
                      className="stat ovr_12 stat_tier_3"
                      style={{
                        backgroundColor: "rgba(250, 250, 250, 0.2)",
                      }}
                    >
                      {Math.trunc(val_gk)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <table
              className="player-info"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                valign: "middle",
                verticalAlign: "middle",
              }}
            >
              <tbody>
                <tr>
                  <td>Nombre</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>SteamID</td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td>Equipo</td>
                  <td>{fullteam}</td>
                </tr>
                <tr>
                  <td>Partidos</td>
                  <td>{matches}</td>
                </tr>
                <tr>
                  <td>Partidos Reales</td>
                  <td>{Math.round(totaltime)}</td>
                </tr>
                <tr>
                  <td>Posicion</td>
                  <td>{pos}</td>
                </tr>
                <tr>
                  <td>Goles</td>
                  <td>{goals}</td>
                </tr>
                <tr>
                  <td>Asistencias</td>
                  <td>{assists}</td>
                </tr>
                <tr>
                  <td>Pases</td>
                  <td>{passes}</td>
                </tr>
                <tr>
                  <td>Intercepciones</td>
                  <td>{interceptions}</td>
                </tr>
                <tr>
                  <td>Atajadas</td>
                  <td>{saves}</td>
                </tr>
                <tr>
                  <td>Posesion</td>
                  <td>{Math.round(possession)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-column" style={{ flexGrow: 2 }}>
            <div className="stats-container">
              <h3>Habilidad</h3>
              <div className="flex flex-wrap stats-block-container">
                <div className="stats-block">
                  <h4>
                    <span
                      className="stat_tier_2 stat"
                      style={{
                        backgroundColor:
                          AF >= 90
                            ? "#02fec5"
                            : AF >= 80 && AF < 90
                            ? "#a8fe02"
                            : AF >= 70 && AF < 80
                            ? "#fbb206"
                            : "red",
                      }}
                    >
                      {Math.round(AF)}
                    </span>
                    Poder Ofensivo
                  </h4>
                  <div className="stat-bar">
                    <div
                      className="stat_tier_2 stat-bar-div"
                      style={{
                        backgroundColor:
                          AF >= 90
                            ? "#02fec5"
                            : AF >= 80 && AF < 90
                            ? "#a8fe02"
                            : AF >= 70 && AF < 80
                            ? "#fbb206"
                            : "red",
                        width: `${AF}%`,
                      }}
                    ></div>
                  </div>
                  <table className="player-stats-modern">
                    <tbody>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              finavg >= 90
                                ? "#02fec5"
                                : finavg >= 80 && finavg < 90
                                ? "#a8fe02"
                                : finavg >= 70 && finavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {finavg}
                        </td>
                        <td>Finalizacion</td>
                      </tr>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              preavg >= 80
                                ? "#02fec5"
                                : preavg >= 60 && preavg < 80
                                ? "#a8fe02"
                                : preavg >= 40 && preavg < 60
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {preavg}
                        </td>
                        <td>Precision</td>
                      </tr>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              attackassistavg >= 90
                                ? "#02fec5"
                                : attackassistavg >= 80 && attackassistavg < 90
                                ? "#a8fe02"
                                : attackassistavg >= 70 && attackassistavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {attackassistavg}
                        </td>
                        <td>Asistidor</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="stats-block">
                  <h4>
                    <span
                      className="stat_tier_2 stat"
                      style={{
                        backgroundColor:
                          AD >= 90
                            ? "#02fec5"
                            : AD >= 80 && AD < 90
                            ? "#a8fe02"
                            : AD >= 70 && AD < 80
                            ? "#fbb206"
                            : "red",
                      }}
                    >
                      {Math.trunc(AD)}
                    </span>
                    Aptitud Defensiva
                  </h4>
                  <div className="stat-bar">
                    <div
                      className="stat_tier_2 stat-bar-div"
                      style={{
                        backgroundColor:
                          AD >= 90
                            ? "#02fec5"
                            : AD >= 80 && AF < 90
                            ? "#a8fe02"
                            : AD >= 70 && AD < 80
                            ? "#fbb206"
                            : "red",
                        width: `${AD}%`,
                      }}
                    ></div>
                  </div>
                  <table className="player-stats-modern">
                    <tbody>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              interavg >= 90
                                ? "#02fec5"
                                : interavg >= 80 && interavg < 90
                                ? "#a8fe02"
                                : interavg >= 70 && interavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {interavg}
                        </td>
                        <td>Recuperacion de Pelota</td>
                      </tr>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              sacrificio >= 90
                                ? "#02fec5"
                                : sacrificio >= 80 && sacrificio < 90
                                ? "#a8fe02"
                                : sacrificio >= 70 && sacrificio < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {sacrificio}
                        </td>
                        <td>Sacrificio</td>
                      </tr>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              defensepassavg >= 90
                                ? "#02fec5"
                                : defensepassavg >= 80 && defensepassavg < 90
                                ? "#a8fe02"
                                : defensepassavg >= 70 && defensepassavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {defensepassavg}
                        </td>
                        <td>Pasador</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="stats-block">
                  <h4>
                    <span
                      className="stat_tier_2 stat"
                      style={{
                        backgroundColor:
                          CC >= 90
                            ? "#02fec5"
                            : CC >= 80 && CC < 90
                            ? "#a8fe02"
                            : CC >= 70 && CC < 80
                            ? "#fbb206"
                            : "red",
                      }}
                    >
                      {Math.round(CC)}
                    </span>
                    Capacidad Creativa
                  </h4>
                  <div className="stat-bar">
                    <div
                      className="stat_tier_2 stat-bar-div"
                      style={{
                        backgroundColor:
                          CC >= 90
                            ? "#02fec5"
                            : CC >= 80 && CC < 90
                            ? "#a8fe02"
                            : CC >= 70 && CC < 80
                            ? "#fbb206"
                            : "red",
                        width: `${CC}%`,
                      }}
                    ></div>
                  </div>
                  <table className="player-stats-modern">
                    <tbody>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              passavg >= 90
                                ? "#02fec5"
                                : passavg >= 80 && passavg < 90
                                ? "#a8fe02"
                                : passavg >= 70 && passavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {passavg}
                        </td>
                        <td>Pasador</td>
                      </tr>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              assistavg >= 90
                                ? "#02fec5"
                                : assistavg >= 80 && assistavg < 90
                                ? "#a8fe02"
                                : assistavg >= 70 && assistavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {assistavg}
                        </td>
                        <td>Asistidor</td>
                      </tr>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              posavg >= 90
                                ? "#02fec5"
                                : posavg >= 80 && posavg < 90
                                ? "#a8fe02"
                                : posavg >= 70 && posavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {posavg}
                        </td>
                        <td>Posesion</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="stats-block">
                  <h4>
                    <span
                      className="stat_tier_2 stat"
                      style={{
                        backgroundColor:
                          CP >= 90
                            ? "#02fec5"
                            : CP >= 80 && CP < 90
                            ? "#a8fe02"
                            : CP >= 70 && CP < 80
                            ? "#fbb206"
                            : "red",
                      }}
                    >
                      {Math.trunc(CP)}
                    </span>
                    Capacidad Portero
                  </h4>
                  <div className="stat-bar">
                    <div
                      className="stat_tier_2 stat-bar-div"
                      style={{
                        backgroundColor:
                          CP >= 90
                            ? "#02fec5"
                            : CP >= 80 && CP < 90
                            ? "#a8fe02"
                            : CP >= 70 && CP < 80
                            ? "#fbb206"
                            : "red",
                        width: `${Math.trunc(CP)}%`,
                      }}
                    ></div>
                  </div>
                  <table className="player-stats-modern">
                    <tbody>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              savesavg >= 90
                                ? "#02fec5"
                                : savesavg >= 80 && savesavg < 90
                                ? "#a8fe02"
                                : savesavg >= 70 && savesavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {savesavg}
                        </td>
                        <td>Atrapada</td>
                      </tr>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              savespercentavg >= 90
                                ? "#02fec5"
                                : savespercentavg >= 80 && savespercentavg < 90
                                ? "#a8fe02"
                                : savespercentavg >= 70 && savespercentavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {savespercentavg}
                        </td>
                        <td>Efectividad de atrapada</td>
                      </tr>
                      <tr>
                        <td
                          className="stat_tier_3 stat"
                          style={{
                            backgroundColor:
                              concededavg >= 90
                                ? "#02fec5"
                                : concededavg >= 80 && concededavg < 90
                                ? "#a8fe02"
                                : concededavg >= 70 && concededavg < 80
                                ? "#fbb206"
                                : "red",
                          }}
                        >
                          {concededavg}
                        </td>
                        <td>Seguridad</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cards-container flex flex-expand">
                <div className="player-main-column">
                  <h3>Estilo de Juego</h3>
                  <ul className="player-index-list">
                    <li></li>
                  </ul>
                </div>
                <div className="player-main-column">
                  <h3>Habilidades de Jugador</h3>
                  <ul className="player-index-list">
                    <li></li>
                    {getSkill(playerID) && <li>{getSkill(playerID)}</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}

/* Card.getInitialProps = async (ctx) => {
  const res = await fetch("/json/players.json")
  const json = await res.json()
  return { players: players }
}
*/

export default Card

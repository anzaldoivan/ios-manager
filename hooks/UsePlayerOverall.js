import React, { useState, useEffect } from "react"
import {
  doSomethingWithInput,
  justAnAlert,
  steamid_to_64bit,
  getSeason,
  getTeam,
  getBanner,
} from "components/Util/Util"

export function UsePlayerOverall(player, temporada) {
  const [apiteam, setApiteam] = useState(0)
  const [apioverall, setApioverall] = useState(0)
  const [isreal, setIseal] = useState(0)
  const [theplayer, setTheplayer] = useState(player)
  const [thetemp, setThetemp] = useState(temporada)

  useEffect(() => {
    async function fetchMyAPI() {
      const apiCallt1 = await fetch(
        `https://stats.iosoccer-sa.bid/api/player/${theplayer}/${thetemp}`
      )
      const usert1 = await apiCallt1.json()
      // call setName below to change the state 'name'
      // fetch para obtener los stats de la temporada / copa especificada
      console.log(
        "DEBUG DEL CUSTOM: player->" + theplayer + " / Resultado: " + usert1
      )
      if (usert1[0] && usert1[0].matches >= 1) {
        const totaltime =
          usert1[0].secondsplayed / 60 / 90 > usert1[0].matches
            ? usert1[0].matches
            : usert1[0].secondsplayed / 60 / 90
        let PASS = Math.round((usert1[0].passescompleted / totaltime) * 5)
        let DEFPASS = Math.round(doSomethingWithInput(PASS))
        let ASISS = Math.round((usert1[0].assists / totaltime) * 140)
        const TACKLE = Math.round(
          (usert1[0].tacklescompleted / usert1[0].tackles) * 100 * 4.5
        )
        const MATCHESRATIO = totaltime / usert1[0].matches
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
        POSS = Math.round(doSomethingWithInput(POSS))
        ATTACKASISS = Math.round(doSomethingWithInput(ASISS))
        FIN = Math.round(doSomethingWithInput(FIN))
        PRE = Math.round(doSomethingWithInput(PRE))
        SAVE = Math.round(doSomethingWithInput(SAVE))
        SAVEPERCENT = Math.round(doSomethingWithInput(SAVEPERCENT))
        CONCEDED = Math.round(doSomethingWithInput(CONCEDED))

        const AFT1 = (FIN + PRE + ATTACKASISS) / 3
        const ADT1 = (INTER + DEFPASS) / 2
        // const CCT1 = ((usert1[0].passescompleted+usert1[0].assists*10+usert1[0].possession*10)/totaltime)*2.05;
        const CCT1 = (PASS + ASISS + POSS) / 3
        const CPT1 = (SAVE + SAVEPERCENT + CONCEDED) / 3
        const val_deft1 = (ADT1 * 2.3 + AFT1 / 2.5 + CCT1 / 2) / 3
        const val_delt1 = (AFT1 * 2.3 + ADT1 / 2.5 + CCT1 / 2) / 3
        const val_mcat1 = (CCT1 + AFT1) / 2
        const val_mcdt1 = (CCT1 + ADT1) / 2
        const val_gkt1 = CPT1
        let ovrt1
        let pos
        if (val_deft1 >= val_delt1) {
          if (val_deft1 >= val_mcat1) {
            if (val_deft1 >= val_mcdt1) {
              ovrt1 = Math.trunc(val_deft1)
            } else {
              ovrt1 = Math.trunc(val_mcdt1)
            }
          } else {
            if (val_mcat1 >= val_mcdt1) {
              ovrt1 = Math.trunc(val_mcat1)
            } else {
              ovrt1 = Math.trunc(val_mcdt1)
            }
          }
        } else {
          if (val_delt1 >= val_mcat1) {
            if (val_delt1 >= val_mcdt1) {
              ovrt1 = Math.trunc(val_delt1)
            } else {
              ovrt1 = Math.trunc(val_mcdt1)
            }
          } else {
            if (val_mcat1 >= val_mcdt1) {
              ovrt1 = Math.trunc(val_mcat1)
            } else {
              ovrt1 = Math.trunc(val_mcdt1)
            }
          }
        }
        if (ovrt1 < CPT1) {
          ovrt1 = Math.trunc(CPT1)
        }
        setApioverall(ovrt1)
        setApiteam(getTeam(usert1[0].team))
        setIseal(true)
      } else {
        setIseal(false)
      }
    }
    fetchMyAPI()
  }, [player])

  console.log("Fetch test -> " + apiteam + " / " + apioverall + " / " + isreal)
  return [apiteam, apioverall, isreal]
}

// uso:   const [num1, num2, num3] = UsePlayerOverall(playerID, tID)

//  console.log("resultado del test: " + num3)

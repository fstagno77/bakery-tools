/**
 * Fermentation Data Module
 *
 * Dati di riferimento per i tempi di fermentazione
 * basati su rapporti di rinfresco e temperature.
 */

export const fermentationData = {
    ratios: [
        {
            ratio: "1:1:1",
            starterPart: 1,
            flourPart: 1,
            waterPart: 1,
            times: {
                cool: { min: 4, max: 6 },
                medium: { min: 3, max: 5 },
                warm: { min: 2, max: 4 }
            }
        },
        {
            ratio: "1:2:2",
            starterPart: 1,
            flourPart: 2,
            waterPart: 2,
            times: {
                cool: { min: 5, max: 7 },
                medium: { min: 4, max: 6 },
                warm: { min: 3, max: 5 }
            }
        },
        {
            ratio: "1:3:3",
            starterPart: 1,
            flourPart: 3,
            waterPart: 3,
            times: {
                cool: { min: 6, max: 8 },
                medium: { min: 5, max: 7 },
                warm: { min: 4, max: 6 }
            }
        },
        {
            ratio: "1:5:5",
            starterPart: 1,
            flourPart: 5,
            waterPart: 5,
            times: {
                cool: { min: 8, max: 12 },
                medium: { min: 7, max: 10 },
                warm: { min: 6, max: 8 }
            }
        },
        {
            ratio: "1:10:10",
            starterPart: 1,
            flourPart: 10,
            waterPart: 10,
            times: {
                cool: { min: 12, max: 16 },
                medium: { min: 10, max: 14 },
                warm: { min: 9, max: 12 }
            }
        },
        {
            ratio: "1:15:15",
            starterPart: 1,
            flourPart: 15,
            waterPart: 15,
            times: {
                cool: { min: 16, max: 20 },
                medium: { min: 14, max: 18 },
                warm: { min: 12, max: 16 }
            }
        },
        {
            ratio: "1:20:20",
            starterPart: 1,
            flourPart: 20,
            waterPart: 20,
            times: {
                cool: { min: 18, max: 24 },
                medium: { min: 16, max: 20 },
                warm: { min: 14, max: 18 }
            }
        }
    ],
    temperatureRanges: {
        cool: {
            label: "21–22 °C",
            min: 21,
            max: 22
        },
        medium: {
            label: "22–24 °C",
            min: 22,
            max: 24
        },
        warm: {
            label: "> 24 °C",
            min: 24,
            max: 30
        }
    }
};

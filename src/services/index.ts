import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

// https://levelup.gitconnected.com/read-csv-file-in-node-js-and-typescript-91cf98e2e64e
const PATH = 'data/korea_demographics_2000-2022.csv'
const HEADERS = ["Date","Region","Birth","Birth_rate","Death","Death_rate","Divorce","Divorce_rate","Marriage","Marriage_rate","Natural_growth","Natural_growth_rate"]

type DemographicData = {
  Date: string
  Region: string
  Birth: number
  Birth_rate: number
  Death: number
  Death_rate: number
  Divorce: number
  Divorce_rate: number
  Marriage: number
  Marriage_rate: number
  Natural_growth: number
  Natural_growth_rate: number

}

// export const fetchDemographicData = async () => {
//   const csvPath = path.resolve(__dirname, PATH)
//   const data = await fs.readFile(csvPath, {encoding: 'utf-8'})
//   parse(data, {
//     delimiter: ',',
//     columns: HEADERS
//   }, (error, result:DemographicData[]) => {
//     if(error) {
//       console.error(error)
//     }
//     console.log(result)
//   })
// }

// export const createMockData = (n: number): Promise<mockData[]> =>
//   new Promise((resolve, reject) => {
//     const result = [] as mockData[]
//     for (let i = 0; i < n; i++) {
//       result.push({
//         id: makeId(10),
//         type: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
//         value: makeValue()
//       })
//     }
//     setTimeout(() => resolve(result), 100)
//   })

const readDataTest = () => {
  const result:DemographicData[] = []
  const csvPath = path.resolve(PATH)
  fs.createReadStream(csvPath)
    // .pipe(parse({ delimiter: ",", columns: HEADERS, from_line:2 }))
    .pipe(parse({ delimiter: ",", columns: HEADERS }))
    .on('data', (data) => (result.push(data)))
    .on('end', () => (console.log(result)));
}

// {
//   Date: '2/1/2000',
//   Region: '경상남도',
//   Birth: '3612',
//   Birth_rate: '14.79',
//   Death: '1629',
//   Death_rate: '6.7',
//   Divorce: '576',
//   Divorce_rate: '2.4',
//   Marriage: '1882',
//   Marriage_rate: '7.7',
//   Natural_growth: '1983',
//   Natural_growth_rate: '8.1'
// },
// {
//   Date: '2/1/2000',
//   Region: '인천',
//   Birth: '3069',
//   Birth_rate: '15.42',
//   Death: '852',
//   Death_rate: '4.3',
//   Divorce: '649',
//   Divorce_rate: '3.3',
//   Marriage: '1261',
//   Marriage_rate: '6.3',
//   Natural_growth: '2217',
//   Natural_growth_rate: '11.1'
// },
// {
//   Date: '2/1/2000',
//   Region: '제주도',
//   Birth: '764',
//   Birth_rate: '17.89',
//   Death: '259',
//   Death_rate: '6.1',
//   Divorce: '139',
//   Divorce_rate: '3.3',
//   Marriage: '441',
//   Marriage_rate: '10.3',
//   Natural_growth: '505',
//   Natural_growth_rate: '11.8'
// },
// {
//   Date: '2/1/2000',
//   Region: '전라북도',
//   Birth: '2296',
//   Birth_rate: '14.45',
//   Death: '1212',
//   Death_rate: '7.6',
//   Divorce: '332',
//   Divorce_rate: '2.1',
//   Marriage: '975',
//   Marriage_rate: '6.1',
//   Natural_growth: '1084',
//   Natural_growth_rate: '6.8'
// },
// {
//   Date: '2/1/2000',
//   Region: '전라남도',
//   Birth: '2366',
//   Birth_rate: '13.87',
//   Death: '1537',
//   Death_rate: '9',
//   Divorce: '376',
//   Divorce_rate: '2.2',
//   Marriage: '1104',
//   Marriage_rate: '6.5',
//   Natural_growth: '829',
//   Natural_growth_rate: '4.9'
// },
// {
//   Date: '2/1/2000',
//   Region: '세종',
//   Birth: '',
//   Birth_rate: '',
//   Death: '',
//   Death_rate: '',
//   Divorce: '',
//   Divorce_rate: '',
//   Marriage: '',
//   Marriage_rate: '',
//   Natural_growth: '',
//   Natural_growth_rate: ''
// },

const getBirthRateByRegion(region:string) {
  const result:{date:string, value:number}[]
  const csvPath = path.resolve(PATH)
  fs.createReadStream(csvPath)
  .pipe(parse({ delimiter: ",", columns: HEADERS }))
  .pipe() // ...?
  .on('data', (data) => (result.push(data)))
  .on('end', () => (console.log(result)));
}


console.log('hello')
readDataTest()
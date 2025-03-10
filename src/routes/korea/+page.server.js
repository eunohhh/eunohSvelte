// import axios from 'axios';
import MakeIndex from './indexClass.js';

export async function load({ fetch }) {

    const optionPlugin = {
        legend: {
            display: true,
            labels: {
                usePointStyle: true,
            }
        }
    }

    const finalTotalPop = {
        summary : '총인구 : 5천183만6천명 (2020), 인구성장률 : 0.14% (2020)',
        data : {
            labels : ['2000', '2010', '2018', '2019', '2020'],
            datasets : [
                {
                    label: '총인구(천명)',
                    yAxisID : 'y-left',
                    type: 'bar',
                    data: [47008,49554,51585,51765,51836],
                    borderWidth: 1
                },
                {
                    label: '인구성장률(%)',
                    yAxisID : 'y-right',
                    type : 'line',        
                    fill : false,         // 채우기 없음
                    lineTension : 0.2,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(255, 153, 0)',
                    borderColor: 'rgb(255, 153, 0)',
                    data: [0.84,0.50,0.43,0.35,0.14]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                'y-left': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: false,
                    min : 46000,
                    max : 52000,
                    grace: '0%'
                },
                'y-right': {
                    type: 'linear',
                    position : 'right',
                    beginAtZero: false,
                    min : 0,
                    max : 1,
                    grace: '10%'
                }
            },
            plugins : optionPlugin
        }
    };

    const birthDeath = {
        summary : '출생자수 : 249,186명, 사망자수 : 372,939명',
        data : {
            labels : ['2018', '2019', '2020', '2021', '2022'],
            datasets : [
                {
                    label: '출생자수',
                    yAxisID : 'y-left',
                    type: 'line',
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(0,153,0)',
                    borderColor: 'rgb(0,153,0)',
                    data: [326822,302676,272337,260562,249186]
                },
                {
                    label: '사망자수',
                    yAxisID : 'y-right',
                    type : 'line',        
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(255, 0, 150)',
                    borderColor: 'rgb(255, 0, 150)',
                    data: [298820,295110,304948,317680,372939]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                'y-left': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: false,
                    min : 200000,
                    max : 400000,
                    grace: '5%'
                },
                'y-right': {
                    type: 'linear',
                    position : 'right',
                    beginAtZero: false,
                    min : 200000,
                    max : 400000,
                    grace: '5%'
                }
            },
            plugins : optionPlugin
        }
    };

    const immigrant = {
        summary : '남성결혼이민자 : 36,820명, 여성결혼이민자 : 137,812명',
        data : {
            labels : ['2017', '2018', '2019', '2020', '2021'],
            datasets : [
                {
                    label: '남성',
                    yAxisID : 'y-left',
                    type: 'line',
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(255, 0, 150)',
                    borderColor: 'rgb(255, 0, 150)',
                    data: [30745,32858,34628,35679,36820]
                },
                {
                    label: '여성',
                    yAxisID : 'y-right',
                    type : 'line',        
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(0,153,0)',
                    borderColor: 'rgb(0,153,0)',
                    data: [129908,134024,139254,138077,137812]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                'y-left': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: false,
                    min : 20000,
                    max : 150000,
                    grace: '15%'
                },
                'y-right': {
                    type: 'linear',
                    position : 'right',
                    beginAtZero: false,
                    min : 20000,
                    max : 150000,
                    grace: '15%'
                }
            },
            plugins : optionPlugin
        }
    };

    const monthlyWage = {
        summary : '남성 월평균임금 : 4,127천원, 여성 월평균임금 : 2,683천원',
        data : {
            labels : ['2018', '2019', '2020', '2021', '2022'],
            datasets : [
                {
                    label: '남성',
                    yAxisID : 'y-left',
                    type: 'line',
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(255,0,150)',
                    borderColor: 'rgb(255,0,150)',
                    data: [3569,3682,3722,3833,4127],
                },
                {
                    label: '여성',
                    yAxisID : 'y-left',
                    type : 'line',        
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(0,0,255)',
                    borderColor: 'rgb(0,0,255)',
                    data: [2259,2371,2408,2476,2683]
                },
                {
                    label: '정규직',
                    yAxisID : 'y-right',
                    type : 'line',        
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(0,200,255)',
                    borderColor: 'rgb(0,200,255)',
                    data: [3510,3612,3693,3795,4078]
                },
                {
                    label: '비정규직',
                    yAxisID : 'y-right',
                    type : 'line',        
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(255,255,0)',
                    borderColor: 'rgb(255,255,0)',
                    data: [1588,1643,1620,1681,1826]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                'y-left': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: false,
                    min : 1500,
                    max : 4500,
                    grace: '0%'
                },
                'y-right': {
                    type: 'linear',
                    position : 'right',
                    beginAtZero: false,
                    min : 1500,
                    max : 4500,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    };

    const houseCost = {
        summary : '소득대비주택가격비율 : 15.7%, 소득대비주택임대료비율 : 6.7%',
        data : {
            labels : ['2017', '2018', '2019', '2020', '2021'],
            datasets : [
                {
                    label: '가격PIR',
                    yAxisID : 'y-left',
                    type: 'line',
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(255, 0, 150)',
                    borderColor: 'rgb(255, 0, 150)',
                    data: [5.6,5.5,5.4,5.5,6.7]
                },
                {
                    label: '임대료RIR',
                    yAxisID : 'y-right',
                    type : 'line',        
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(0,153,0)',
                    borderColor: 'rgb(0,153,0)',
                    data: [17,15.5,16.1,16.6,15.7]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                'y-left': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: false,
                    min : 0,
                    max : 20,
                    grace: '15%'
                },
                'y-right': {
                    type: 'linear',
                    position : 'right',
                    beginAtZero: false,
                    min : 0,
                    max : 20,
                    grace: '15%'
                }
            },
            plugins : optionPlugin
        }
    };

    const discrimination = {
        summary : '차별경험률 : 4.413% (2021년)',
        data : {
            labels : ['2019', '2020', '2021'],
            datasets : [
                {
                    label: '차별경험률(%)',
                    type: 'bar',
                    data: [7.5,8.088,4.413]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                y: {
                    beginAtZero: false,
                    min : 0,
                    max : 10,
                    grace: '0%'
                }
            }
        },
        plugins : optionPlugin
    };

    const minorInclusive = {
        summary : '성소수자에 대한 포용성 : 44% (2022년)',
        data : {
            labels : ['2020', '2021', '2022'],
            datasets : [
                {
                    label: '성소수자에 대한 포용성(%)',
                    type: 'bar',
                    data: [43,46,44]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                y: {
                    beginAtZero: false,
                    min : 0,
                    max : 100,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    };

    const domesticViolence = {
        summary : '가정폭력피해경험률 : 27.5% (2019년)',
        data : {
            labels : ['2016', '2019'],
            datasets : [
                {
                    label: '가정폭력피해경험률(%)',
                    type: 'bar',
                    data: [41.5,27.5]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                y: {
                    beginAtZero: false,
                    min : 0,
                    max : 50,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    };

    const womanCongress = {
        summary : '여성 국회의원 비율 : 19% (2020년)',
        data : {
            labels : ['2004', '2008', '2012', '2016', '2020'],
            datasets : [
                {
                    label: '여성국회의원비율(%)',
                    type: 'bar',
                    data: [13,13.7,15.7,17,19]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                y: {
                    beginAtZero: false,
                    min : 0,
                    max : 100,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    };

    const hourlyWage = {
        summary : '남성 평균시간당임금: 25,886원, 여성 평균시간당임금: 18,118원',
        data : {
            labels : ['2018', '2019', '2020', '2021', '2022'],
            datasets : [
                {
                    label: '남성(원)',
                    yAxisID : 'y-left',
                    type: 'line',
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(255, 0, 150)',
                    borderColor: 'rgb(255, 0, 150)',
                    data: [22515,23566,22086,22632,25886]
                },
                {
                    label: '여성(원)',
                    yAxisID : 'y-right',
                    type : 'line',        
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(0,153,0)',
                    borderColor: 'rgb(0,153,0)',
                    data: [15265,16358,15372,15802,18113]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                'y-left': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: false,
                    min : 10000,
                    max : 30000,
                    grace: '0%'
                },
                'y-right': {
                    type: 'linear',
                    position : 'right',
                    beginAtZero: false,
                    min : 10000,
                    max : 30000,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    };

    const workSatisfaction = {
        summary : '일자리만족도 : 34.65% (2021년)',
        data : {
            labels : ['2013', '2015', '2017', '2019', '2021'],
            datasets : [
                {
                    label: '일자리만족도(%)',
                    type: 'bar',
                    data: [23.775,23.35,26.25,31.025,34.65]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                y: {
                    beginAtZero: false,
                    min : 0,
                    max : 100,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    }

    const leisure = {
        summary : '문화예술 및 스포츠 관람횟수 : 4.5회/연 (2021년)',
        data : {
            labels : ['2013', '2015', '2017', '2019', '2021'],
            datasets : [
                {
                    label: '문화예술 및 스포츠 관람횟수(회/연)',
                    type: 'bar',
                    data: [8.9,8.4,9.0,8.4,4.5]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                y: {
                    beginAtZero: false,
                    min : 0,
                    max : 10,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    };

    const criminal = {
        summary : '범죄피해율 : 3,806건/십만명당 (2020년)',
        data : {
            labels : ['2012', '2014', '2016', '2018', '2020'],
            datasets : [
                {
                    label: '범죄피해율(건/십만명당)',
                    type: 'bar',
                    data: [4600.2,3742.5,3555.7,3678.0,3806.0]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                y: {
                    beginAtZero: false,
                    min : 3000,
                    max : 5000,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    };

    const isolation = {
        summary : '사회적고립도 : 34.1% (2021년)',
        data : {
            labels : ['2013', '2015', '2017', '2019', '2021'],
            datasets : [
                {
                    label: '사회적고립도(%)',
                    type: 'bar',
                    data: [32.9,30.0,28.1,27.7,34.1]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                y: {
                    beginAtZero: false,
                    min : 20,
                    max : 50,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    };

    const houseWorkHours = {
        summary : '남성 가사노동시간: 64분(일평균) (2019년), 여성 가사노동시간: 225분(일평균) (2019년)',
        data : {
            labels : ['1999', '2004', '2009', '2014', '2019'],
            datasets : [
                {
                    label: '남성(분/일평균)',
                    yAxisID : 'y-left',
                    type: 'line',
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(255, 0, 150)',
                    borderColor: 'rgb(255, 0, 150)',
                    data: [36,40,47,53,64]
                },
                {
                    label: '여성(분/일평균)',
                    yAxisID : 'y-right',
                    type : 'line',        
                    fill : false,         // 채우기 없음
                    lineTension : 0,  // 0이면 꺾은선 그래프, 숫자가 높을수록 둥글해짐
                    pointRadius : 3,    // 각 지점에 포인트 주지 않음
                    backgroundColor: 'rgb(0,153,0)',
                    borderColor: 'rgb(0,153,0)',
                    data: [270,255,247,238,225]
                },
            ]
        },
        options : {
            responsive:true,
            scales: {
                'y-left': {
                    type: 'linear',
                    position: 'left',
                    beginAtZero: false,
                    min : 0,
                    max : 300,
                    grace: '0%'
                },
                'y-right': {
                    type: 'linear',
                    position : 'right',
                    beginAtZero: false,
                    min : 0,
                    max : 300,
                    grace: '0%'
                }
            },
            plugins : optionPlugin
        }
    };

    const makeConfig = (startYear, lastYear, label, type, data, beginZero, ymin='auto', ymax='auto', grace='5%', summary) => {
        const get = new MakeIndex(startYear, lastYear, label, type, data, beginZero, ymin, ymax, grace, summary);
        const set = {
            summary : get.summary,
            data : get.data,
            options : get.options
        } 
        return set;
    }

    //사회
    const finalAverageAge = makeConfig(2018, 5, '평균연령(세)', 'bar', [41.7,42.2,42.7,43.3,43.9], false, 40, 45, '5%', '평균연령 : 43.9세 (2022년)');
    const growthPopulation = makeConfig(2018, 5, '인구성장률(%)', 'line', [0.35,0.14,-0.18,-0.23,-0.14], false, -1, 2, '0%', '인구성장률 : -0.14% (2022년)');
    const averageBirth = makeConfig(2018, 5, '합계출산율(%)', 'line', [0.977,0.918,0.837,0.808,0.78], true, 0.7, 1, '5%', '합계출산률 : 0.78% (2022년)');
    const suicideRate = makeConfig(2018, 5, '자살률(명, 십만명당)', 'line', [26.6,26.9,25.7,26,25.2], false, 20, 30, '5%', '자살률 : 십만명당 25.2명 (2022년)');
    const oldrate = makeConfig(2019, 5, '고령화지수(%)', 'bar', [119.2,129.3,139.5,152,167], false, 50, 180, '5%', '고령화지수 : 167% (2023년)');
    const foreigner = makeConfig(2018, 5, '체류외국인수(천명)', 'bar', [2368,2525,2036,1957,2246], false, 1500, 2500, '5%', '체류외국인수 : 2,246,000명 (2022년)');
    const greengas = makeConfig(2016, 5, '온실가스배출량(100만tCO2)', 'bar', [693.6,710.7,727,701.2,656.2], false, 600, 750, '5%', '온실가스배출량 : 656백만tonCO2 (2020년)');

    //경제
    const houseDebt = makeConfig(2018, 5, '가계부채비율(처분가능소득대비 %)', 'bar', [185,188.2,197.8,209.8,203.7], false, 180, 220, '5%', '가계부채비율 : 203.7% (2022년)');
    const inflation = makeConfig(2018, 5, '소비자물가상승률(%)', 'line', [1.5,0.4,0.5,2.5,5.1], false, -1, 6, '5%', '소비자물가상승률 : 5.1% (2022년)');
    const forex = makeConfig(2018, 5, '외환보유액(억달러)', 'line', [4037,4088,4431,4631,4232], false, 3800, 4800, '5%', '외환보유액 : 4천232억달러 (2022년)');
    const growth = makeConfig(2018, 5, '경제성장률(%)', 'line', [2.9,2.2,-0.7,4.3,2.6], false, -2, 6, '5%', '경제성장률 : 2.6% (2022년)');
    const middleIncome = makeConfig(2019, 5, '기준중위소득추이(원/월)', 'bar', [4129115,4250511,4360354,4575366,4821416], false, 4000000, 5000000, '15%', '기준중위소득추이 : 4,821,416원 (2023년)');
    const middleIncomeLow = makeConfig(2017, 5, '중위소득50%미만비율(%)', 'bar', [17.3,16.7,16.3,15.3,15.1], false, 0, 20, '0%', '중위소득50%미만비율 : 15.1% (2021년)');
    const gni = makeConfig(2018, 5, '1인당국민총소득GNI(만원)', 'bar', [3532,3532,3530,3659,3642], false, 3000, 3700, '10%', 'GNI : 3천6백4십2만원 (2022년)');
    const employ = makeConfig(2018, 5, '고용률(%)', 'line', [60.7,60.9,60.1,60.5,62.1], false, 50, 100, '0%', '고용률 : 62.1% (2022년)');

    //문화
    const lifeSatisfaction = makeConfig(2018, 5, '삶의만족도(%)', 'line', [6.1,6,6,6.3,6.5], false, 0, 100, '5%', '삶의만족도 : 6.5% (2022년)');
    const residentialArea = makeConfig(2017, 5, '1인당주거면적(제곱미터)', 'line', [31.2,31.7,32.9,33.9,33.9], false, 25, 35, '0%', '1인당주거면적 : 33.9제곱미터 (2021)');
    const minorDistance = makeConfig(2018, 5, '소수자에대한거리감(%)', 'bar', [49,57.1,57,54.1,55.9], false, 30, 60, '0%', '소수자에대한거리감 : 55.9% (2022)');
    const houseWork = makeConfig(2018, 5, '가사분담률-여성(%)', 'bar', [79.6,77.8,76.8,76.1,76.1], false, 0, 100, '0%', '가사분담률-여성 : 76.1% (2022)');
    const multicultural = makeConfig(2018, 5, '다문화학생비율(%)', 'bar', [2.2,2.5,2.8,3,3.2], false, 0, 10, '0%', '다문화학생비율 : 3.2% (2022)');
    const womanManager = makeConfig(2018, 5, '여성관리자비율(%)', 'bar', [14.5,15.4,15.7,16.3,14.6], false, 0, 100, '0%', '여성관리자비율 : 14.6% (2022)');
    const library = makeConfig(2017, 5, '공공도서관수(관)', 'bar', [1042,1096,1134,1172,1208], false, 1000, 1300, '0%', '공공도서관수 : 1208관 (2021)');
    const pride = makeConfig(2018, 5, '국민자긍심(%)', 'bar', [80.4,76.3,85.5,87.9,87.3], false, 0, 100, '0%', '국민자긍심 : 87.3% (2022)');
    const wellbeing = makeConfig(2018, 5, '긍정정서(점/10점만점)', 'bar', [6.6,6.5,6.4,6.7,6.7], false, 0, 10, '0%', '긍정정서 : 6.7점 (2022)');
    const trust = makeConfig(2018, 5, '기관신뢰도(%)', 'bar', [41.2,41.5,48.3,55.4,52.8], false, 0, 100, '0%', '기관신뢰도 : 52.8% (2022)');
    const others = makeConfig(2018, 5, '대인신뢰도(%)', 'line', [69.2,66.2,50.6,59.3,54.6], false, 0, 100, '0%', '대인신뢰도 : 54.6% (2022)');

    //노동
    const laborRate = makeConfig(2016, 5, 'GDP대비 노동소득비율(%)', 'bar', [57.6,57.3,58.4,60,59.7], false, 50, 70, '0%', 'GDP대비 노동소득비율 : 59.7% (2020)');
    const unemployment = makeConfig(2019, 5, '실업률(%)', 'bar', [3.8,4,3.7,2.9,2.3], false, 0, 5, '0%', '실업률 : 2.3% (2023)');
    const youngUnemployment = makeConfig(2018, 5, '청년실업률(%)', 'bar', [9.5,8.9,9.0,7.8,6.4], false, 0, 10, '0%', '청년실업률 : 6.4% (2022)');
    const union = makeConfig(2017, 5, '노동조합조직률(%)', 'bar', [10.7,11.8,12.5,14.2,14.2], false, 0, 100, '0%', '노동조합조직률 : 14.2% (2021)');
    const wageGap = makeConfig(2018, 5, '기업규모별 임금격차(%)', 'bar', [52.8,55.1,57.5,54.5,53.6], false, 50, 60, '0%', '기업규모별 임금격차 : 53.6% (2022)');
    const workingHours = makeConfig(2018, 5, '근로시간(시간)', 'bar', [156.4,152.4,163.6,164.2,154.9], false, 100, 200, '0%', '월평균근로시간 : 154.9시간 (2022)');
    const accident = makeConfig(2018, 5, '산재사망률(명/만명)', 'line', [1.12,1.08,1.09,1.07,1.10], false, 0.8, 1.3, '10%', '산재사망률 : 1.1명/만명 (2022)');
    const lowWages = makeConfig(2018, 5, '저임금근로자비율(%)', 'bar', [19.0,17.0,16.0,15.6,16.9], false, 0, 20, '20%', '저임금근로자비율 : 16.9% (2022)');

    return {
        props: {
            //사회
            suicideRate : suicideRate, // 자살률
            totalPopulation : finalTotalPop, // 총인구
            averageAge : finalAverageAge, // 평균연령
            growthPopulation : growthPopulation, // 인구성장률
            averageBirth : averageBirth, // 합계출산률
            oldrate : oldrate, // 고령화지수
            foreigner : foreigner, // 체류외국인수
            birthDeath : birthDeath, // 출생 사망자수
            greengas : greengas, // 온실가스배출량
            immigrant : immigrant, // 결혼이민자수
            trust : trust, // 기관신뢰도
            others: others, // 대인신뢰도
            criminal: criminal, // 범죄피해율
            isolation : isolation,
            
            //경제
            houseDebt : houseDebt, // 가계부채
            houseCost : houseCost, // 주택임대료비율
            inflation : inflation, // 소비자물가상승률
            forex : forex, // 외환보유액
            growth : growth, // 경제성장률
            middleIncome : middleIncome, // 기준 중위소득 추이
            gni : gni,
            middleIncomeLow : middleIncomeLow, // 중위소득 50% 미만비율
            employ: employ,

            //문화
            lifeSatisfaction : lifeSatisfaction, // 삶의만족도  
            residentialArea : residentialArea, // 1인당 주거면적
            discrimination : discrimination, // 차별경험률
            minorInclusive : minorInclusive, // 소수자포용성
            domesticViolence : domesticViolence, // 가정폭력피해경험률
            minorDistance : minorDistance, // 소수자에 대한 거리감
            houseWork : houseWork, // 가사분담률
            multicultural : multicultural, // 다문화학생비율
            womanCongress : womanCongress, // 여성 국회의원 비율
            womanManager : womanManager, // 여성 관리자 비율
            library : library, 
            pride: pride, // 자긍심
            wellbeing: wellbeing, // 긍정정서
            leisure: leisure, // 문화예술 및 스포츠 관람회수

            //노동
            monthlyWage : monthlyWage, // 월평균임금
            hourlyWage : hourlyWage, // 시간당평균임금
            laborRate : laborRate, // GDP대비 노동소득비율
            unemployment : unemployment, // 실업률
            youngUnemployment : youngUnemployment, // 청년실업률
            workSatisfaction : workSatisfaction, // 일자리만족도
            union : union, // 노동조합조직률
            wageGap : wageGap, // 임금격차
            workingHours : workingHours, // 월평균근로시간
            accident : accident, // 산재사망률
            lowWages : lowWages,  // 저임금 근로자 비율
            houseWorkHours : houseWorkHours // 가사노동시간
        }
    };
}


    // async function getIndexNuri(api){
    //     try {
    //         const response = await axios.get(api);
    //         // const response = await fetch(api);
    //         // const toJson = await response.json();
    //         if(response.status === 200){
    //             return response.data;
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // // 총인구
    // const totalPopulation = await getIndexNuri('https://www.index.go.kr/unity/openApi/sttsJsonViewer.do?idntfcId=M82C1532073D11O2&ixCode=5060&statsCode=506001&period=2023:2023');
    // const toStringPop = totalPopulation[0]['값'];
    // const addZero = `${toStringPop}000`;
    // const finalTotalPop = Number(addZero);

    // // 평균연령
    // const averageAge = await getIndexNuri('https://www.index.go.kr/unity/openApi/sttsJsonViewer.do?idntfcId=M82C1532073D11O2&ixCode=F0005&statsCode=F000501&period=2022:2022');
    // const toStringAge = averageAge[0]['값'];
    // const finalAverageAge = Number(toStringAge);

    // // 평균 실질 임금
    // const averageSalary = await getIndexNuri('https://www.index.go.kr/unity/openApi/sttsJsonViewer.do?idntfcId=M82C1532073D11O2&ixCode=8085&statsCode=808501&period=2022:2022');
    // const manSalary = Number(averageSalary[0]['값']); // 남자 임금
    // const womanSalary = Number(averageSalary[1]['값']); // 여자 임금
    // const fulltimeSalary = Number(averageSalary[2]['값']); // 정규직 임금
    // const timeSalary = Number(averageSalary[3]['값']); // 비정규직 임금
    // const salaryArray = [manSalary, womanSalary, fulltimeSalary, timeSalary] // 모두 배열에
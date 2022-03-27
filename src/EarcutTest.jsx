import React, {useEffect, useRef, useState}  from 'react';
import earcut from "earcut";

const EarcutTest = () => {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    // Скопировал с другого компонента, в некст раз объединить компоненты или придумать что-нибудь другое, чтобы не дублировать код
    function calcLengthSidesTriangles(arrCoordinatesVerticesTriangle) {
        let a, b, c;
        let arrLengthSidesTriangles = arrCoordinatesVerticesTriangle.map(elementArr => {
            a = Math.round(Math.abs(Math.sqrt(Math.pow((elementArr[2] - elementArr[0]), 2) + Math.pow((elementArr[3] - elementArr[1]), 2))));
            b = Math.round(Math.abs(Math.sqrt(Math.pow((elementArr[4] - elementArr[0]), 2) + Math.pow((elementArr[5] - elementArr[1]), 2))));
            c = Math.round(Math.abs(Math.sqrt(Math.pow((elementArr[4] - elementArr[2]), 2) + Math.pow((elementArr[5] - elementArr[3]), 2))));
            return [a, b, c];
        })
        console.log(arrLengthSidesTriangles)
        calсQualityMesh(arrLengthSidesTriangles)
    }


    const [stateTriangulation, setStateTriangulation] = useState("Неизвестное качество сетки триангуляции")

// Вычисление качество триангуляции сетки
    function calсQualityMesh(arr) {
        let newArr = arr.map(elementArr =>
            Math.round(((Math.max.apply(null, elementArr) - Math.min.apply(null, elementArr)) / Math.max.apply(null, elementArr)) * 100)
        )
        const initialValue = 0;
        const sumElementsArr = newArr.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
        let mean = sumElementsArr / newArr.length;
        console.log(newArr)
        console.log(sumElementsArr)
        console.log(mean)
        if (mean <= 10) {
            setStateTriangulation(`Триангуляция отличная - ${mean}%`)
        } else if (mean > 10 && mean <= 20) {
            setStateTriangulation(`Триангуляция хорошая - ${mean}%`)
        } else if (mean > 20 && mean <= 40) {
            setStateTriangulation(`Триангуляция нормальная - ${mean}%`)
        } else {
            setStateTriangulation(`Триангуляция плохая - ${mean}%`)
        }
    }
    // function drawCircle() {
    //     context.beginPath();
    //     context.fillStyle = "#FFF";
    //     context.arc(300, 300, 200, 0, Math.PI * 2);
    //     context.fill();
    //     context.stroke();
    //     context.closePath();
    // }
    // drawCircle()
    //let triangles = earcut([10,0, 0,50, 60,60, 70,10]); // returns [1,0,3, 3,2,1]
    // quadrate
    //  let a = [
    //      [[0,100],[100,100],[100,0],[0,0]], //outer polygon
    //      [[25,25],[75,25],[75,75],[25,75]] //hole
    //  ]
    /*
     //  function triangulationCircle(stepСircle) {
     //     const pointsForCircle = [];
     //
     //      let radius = 200;
     //      let x = null;
     //      let y = null;
     //      pointsForCircle.push([300, 300]);
     //      for (let phi = 0; phi <= 360; phi += stepСircle) {
     //          x = Math.abs(Math.floor(radius * Math.cos(phi)) + 300);
     //          y = Math.abs(Math.floor(radius * Math.sin(phi)) + 300);
     //          pointsForCircle.push([x, y]);
     //      }
     //      const arrResult = [];
     //      arrResult.splice(0,0,pointsForCircle)
     //      console.log(arrResult)
     //
     //      triangulationEarcut(arrResult)
     //  }
     //  triangulationCircle(40);
  */


    // // circle
    //  let circle = [
    //      [[104,343],[115,222],[150,449],[243,491],[480,214],[277,101],[365,489],[397,125],[462,416]], //outer polygon
    //     // [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]] //hole
    //  ]
  //  polygon
    let polygon = [
        [[0, 0],[500, 0], [500, 500], [400, 500],  [400, 250], [100, 250], [100, 500], [0, 500],], //outer polygon
         // [[250,50],[250,100],[100,100],[100,50]] //hole
    ]
   // Rectangle test increase points
   //  function addPointsRectangle() {
   //      let arr = [0, 0,600, 0, 600, 300, 0, 300]
   //      // for (let i = 0; i<=50; i++) {
   //      //     arr.push(Math.random() * 600, Math.random() * 300)
   //      // }
   //          for (let x = 0; x <= 600; x += 50) {
   //              for (let y = 0; y <= 300; y += 50) {
   //
   //                  arr.push(x, y);//x+600, y+150
   //              }
   //          }
   //      let result = earcut(arr);
   //      console.log(result)
   //      for (let i = 0; i < arr.length; i += 3) {
   //          context.beginPath();
   //          context.moveTo(arr[result[i] * 2], arr[result[i] * 2 + 1]);
   //          context.lineTo(arr[result[i + 1] * 2], arr[result[i + 1] * 2 + 1]);
   //          context.lineTo(arr[result[i + 2] * 2], arr[result[i + 2] * 2 + 1]);
   //          context.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255}, 0.5)`;
   //          context.fill();
   //          context.closePath();
   //          context.stroke();
   //      }
   //  }
   //  addPointsRectangle()


    const rectangleArrayPoints = [
        [[0, 0], [600, 0], [600, 300], [0, 300]], //outer polygon
        //  [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]] //hole
    ]

   //  console.log(rectangleArrayPoints)
   // let newArrFlat =  rectangleArrayPoints.flat(2)
   //  console.log(newArrFlat)
    // const rectangleArrayPoints2 = [
    //     [  [0, 0], [100, 0],[200, 0],[300, 0],[400, 0],[500, 0],[600, 0], [600, 100], [600, 200],[600, 300],[500, 300],[400, 300],[300, 300],[200, 300],[100, 300],[0, 300],  ], //outer polygon
    // ]
    //rectangle
    // function addPointsRectangle(step) {
    //     const rectangleArrayPoints2 = [];
    //     for (let x = 0; x <= 600; x += step) {
    //         for (let y = 0; y <= 300; y += step) {
    //
    //             rectangleArrayPoints2.push([x, y]);//x+600, y+150
    //         }
    //     }
    //     const newArray = [];
    //     newArray.splice(0, 0,rectangleArrayPoints2)
    //     triangulationEarcut(newArray)
    // }

    function triangulationEarcut(array) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        let toProcess = earcut.flatten(array);
        let result = earcut(toProcess.vertices, toProcess.holes, toProcess.dimensions);
        console.log(toProcess)
        console.log(result)
        let v = toProcess.vertices
        console.log('Размер массива =', v.length/2)
        let arrCoordinatesVerticesTriangle = [];
        for (let i = 0; i < result.length; i += 3) {
            arrCoordinatesVerticesTriangle.push(
                [
                    v[result[i] * 2], v[result[i] * 2 + 1],
                    v[result[i + 1] * 2], v[result[i + 1] * 2 + 1],
                    v[result[i + 2] * 2], v[result[i + 2] * 2 + 1]
                ]
            );
            context.beginPath();
            context.moveTo(v[result[i] * 2], v[result[i] * 2 + 1]);
            context.lineTo(v[result[i + 1] * 2], v[result[i + 1] * 2 + 1]);
            context.lineTo(v[result[i + 2] * 2], v[result[i + 2] * 2 + 1]);
            context.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255}, 0.5)`;
            context.fill();
            context.closePath();
            context.stroke();
        }
        console.log(arrCoordinatesVerticesTriangle)
        calcLengthSidesTriangles(arrCoordinatesVerticesTriangle)
        // Правильность триангуляции
        // let deviation = earcut.deviation(toProcess.vertices, toProcess.holes, toProcess.dimensions, result);
        // console.log(deviation)
        // if (deviation < 0.1) {
        //     setStateTriangulation(`Триангуляция отличная`)
        // }
        // else if (deviation > 0.1 && deviation <= 0.2) {
        //     setStateTriangulation(`Триангуляция хорошая`)
        // }
        // else if (deviation > 0.2 && deviation <= 0.4) {
        //     setStateTriangulation(`Триангуляция нормальная`)
        // }
        // else {
        //     setStateTriangulation(`Триангуляция плохая`)
        // }
    }
    // function triangulationButton(e) {
    //
    //     e.preventDefault();
    //     triangulationEarcut(rectangleArrayPoints)
    //
    // }

    return (
        <div>
            <div><h1>Earcut</h1></div>
            <button onClick={ () => triangulationEarcut(rectangleArrayPoints)}>Триангуляция прямоугольника Earcut</button>
            <button onClick={ () => triangulationEarcut(polygon)}>Триангуляция многоугольника Earcut</button>
            <div>
            {/*<button onClick={ () => addPointsRectangle(50)}>Увеличить количество точек в прямоугольнике</button>*/}
            </div>
            <div>
                <h2>{stateTriangulation}</h2>
            </div>
        </div>
    );
};

export default EarcutTest;
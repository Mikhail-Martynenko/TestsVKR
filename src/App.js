import React, {useEffect, useRef, useState} from "react";
import {Delaunay} from "d3-delaunay";

import './App.css'
import EarcutTest from "./EarcutTest";



function App() {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');

  let pointsForRectangle = [];
  let pointsForCircle = [];

  function triangulationRectangle(stepRectangle) {
    for (let x = 0; x <= 600; x += stepRectangle) {
      for (let y = 0; y <= 300; y += stepRectangle) {
        pointsForRectangle.push([x, y]);//x+600, y+150
      }
    }
  }

// Функция для добавления точек в круг
  function addPointsForCircle(stepСircle) {
    let x = null;
    let y = null;
    // Точка в центре окружности
    pointsForCircle.push([300, 300]);
    //точки на окружности
    // 1й способ
    // for (let phi = 0; phi <= 360; phi += 30) {
    //   let radius = 200;
    //   x = Math.abs(Math.floor(radius * Math.cos(phi / 180 * Math.PI)) + 300);
    //   y = Math.abs(Math.floor(radius * Math.sin(phi / 180 * Math.PI)) + 300);
    //   pointsForCircle.push([x, y]);
    // }
    // for (let phi = 0; phi <= 360; phi += 60) {
    //   let radius = 100;
    //   x = Math.abs(Math.floor(radius * Math.cos(phi / 180 * Math.PI)) + 300);
    //   y = Math.abs(Math.floor(radius * Math.sin(phi / 180 * Math.PI)) + 300);
    //   pointsForCircle.push([x, y]);
    // }


    addPoints(15,200);
    addPoints(20,150);
    addPoints(30,100);
    addPoints(60,50);
    function addPoints(step,radius){
      for (let phi = 0; phi <= 360; phi += step) {
        x = Math.abs(Math.floor(radius * Math.cos(phi / 180 * Math.PI)) + 300);
        y = Math.abs(Math.floor(radius * Math.sin(phi / 180 * Math.PI)) + 300);
        pointsForCircle.push([x, y]);
      }
    }
    drawCircle(300,300,200);
  }

// Нарисовать круг
  function drawCircle(x,y,r) {
    context.beginPath();
    context.fillStyle = "#FFF";
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.closePath();
  }

  // Состояние JSON
  const [jsonPoints, setJsonPoints] = useState('')
  const [jsonVerticesOfTriangles, setJsonVerticesOfTriangles] = useState('')


  useEffect(() => {

  }, [])


// Триангуляция
  function triangulation(arr) {
    console.log(arr.length)
    const delaunay = Delaunay.from(arr);
    let triangles = delaunay.triangles
    let points = delaunay.points;
    // let inedges = delaunay.inedges
    // console.log(inedges)
    //console.log(triangles)
    console.log(delaunay)
    /**/
    let arrCoordinatesVerticesTriangle = []; // массив координат вершин треугольников

    arr.forEach((p)=>{
      drawCircle(p[0],p[1],4)
    })

    for (let i = 0; i < triangles.length / 3; i++) {
      const {points, triangles} = delaunay;
      const t0 = triangles[i * 3 + 0];
      const t1 = triangles[i * 3 + 1];
      const t2 = triangles[i * 3 + 2];
      arrCoordinatesVerticesTriangle.push(
          [
            points[t0 * 2], points[t0 * 2 + 1],
            points[t1 * 2], points[t1 * 2 + 1],
            points[t2 * 2], points[t2 * 2 + 1]
          ]
      );
      context.beginPath();
      context.moveTo(points[t0 * 2], points[t0 * 2 + 1]);
      context.lineTo(points[t1 * 2], points[t1 * 2 + 1]);
      context.lineTo(points[t2 * 2], points[t2 * 2 + 1]);
      // Рандомный цвет треугольников
      context.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255}, 0.5)`;
      context.fill();
      context.closePath();
      context.stroke();
    }
    console.log(arrCoordinatesVerticesTriangle)
    calcLengthSidesTriangles(arrCoordinatesVerticesTriangle)
    setJsonPoints(JSON.stringify(arr))
    setJsonVerticesOfTriangles(JSON.stringify(triangles))
  }


  const [title, setTitle] = useState(50)
  const [title2, setTitle2] = useState(40)


  // Кнопка триангуляции прямоугольника
  function triangulationRectangleButton(e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    e.preventDefault();
    context.clearRect(500, 100, 800, 600);
    triangulationRectangle(Number(title))
   triangulation(pointsForRectangle)
  // triangulation( [[0, 0], [600, 0], [600, 300], [0, 300],
  //   [100, 0],[200, 0],[300, 0],[400, 0],[500, 0],[550, 0],
  //   [100, 300],[200, 300],[300, 300],[400, 300],[500, 300],
  //   [50, 0],[150, 0],[250, 0],[350, 0],[450, 0],
  //   [50, 300],[150, 300],[250, 300],[350, 300],[450, 300],[550, 300],]) // проверял триангуляцию при добавлении точек только на углы прямоугольника
    //triangulation( [[0, 0], [600, 0], [600, 300], [0, 300], [300, 0],[300, 300]])
    pointsForRectangle = [];

  }

  // Кнопка триангуляции круга
  function triangulationCircleButton(e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    e.preventDefault();
    addPointsForCircle(Number(title2))
    triangulation(pointsForCircle)

    pointsForCircle = [];
  }

  // кнопка триангуляции полигона
  function triangulationPolygonButton(e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let arrPointsPolygon = [[0, 0], [500, 0], [500, 500], [400, 500], [400, 250], [100, 250], [100, 500], [0, 500]]
    e.preventDefault();
    triangulation(arrPointsPolygon)
  }

// Подсчёт длин сторон треугольника по трём вершинам
  function calcLengthSidesTriangles(arrCoordinatesVerticesTriangle) {
    let a, b, c;
    // Создаём новый массив с результатами вычислений длин сторон по координатам его вершин
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
    // Создаём новый массив с результатами вычисления по формуле - ((maxSide - minSide) / maxSide) * 100
    let newArr = arr.map(elementArr =>
        Math.round(((Math.max.apply(null, elementArr) - Math.min.apply(null, elementArr)) / Math.max.apply(null, elementArr)) * 100)
    )
    const initialValue = 0;

    // сумма всех элементов в массиве
    const sumElementsArr = newArr.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);

    // считаем среднее
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

  return (
      <div className='App'>
        <div><h1>D3-delaunay</h1></div>
        <form>
          <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type='number'
          />
          <button onClick={triangulationRectangleButton}>Триангуляция прямоугольника</button>
          <div>
            <input
                value={title2}
                onChange={e => setTitle2(e.target.value)}
                type='number'
            />
            <button onClick={triangulationCircleButton}>Триангуляция круга</button>
          </div>
          <div>
            <button onClick={triangulationPolygonButton}>Триангуляция многоугольника</button>
          </div>
        </form>
        <div>
          <h2>{stateTriangulation} </h2>
        </div>
        <div>
          {/*<div>*/}
          {/*  <div>JSON</div>*/}
          {/*  <div>Координаты точек</div>*/}
          {/*  <div>{jsonPoints}</div>*/}
          {/*  <div>Номера вершин треугольников</div>*/}
          {/*  <div>{jsonVerticesOfTriangles}</div>*/}
          {/*</div>*/}

        </div>
        <hr></hr>
        <EarcutTest/>

      </div>

  );
}

export default App;
